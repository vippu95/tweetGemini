import * as React from 'react';
import { useMemo, useEffect, useState, useCallback } from 'react';
import { Body, Container, Logo, SettingsBlock } from './settings_screen.styled';
import { Checkbox } from './components/checkbox';
import { Selector, languageOption } from './components/selector';
import { TextInput } from './components/text_input';
import { H1, H2, Subtitle } from './components/text';
import { Space } from './components/space';
import { locales } from '../background/chat_gpt_client/locales';
import { defaultLocale } from '../background/chat_gpt_client/locales';

export const SettingsScreen = () => {
    const logoPath = useMemo(() => chrome.runtime.getURL('icons/modified_icon.png'), []);
    const [openAIToken, setOpenAIToken] = useState('');
    const [selectedLanguage, setLanguage] = useState(defaultLocale);
    const [isAddSignature, setAddSignature] = useState(true);
    const [isAddTopicForReplies, setTopicForReplies] = useState(false);

    const changeOpenAIToken = useCallback(async (newToken: string) => {
        await chrome.storage.local.set({ openAIToken: newToken });
        setOpenAIToken(newToken);
    }, []);

    const changeSignature = useCallback(async (isNewAddSignature: boolean) => {
        console.log('>>>', isNewAddSignature);
        await chrome.storage.local.set({ isAddSignature: isNewAddSignature });
        setAddSignature(isNewAddSignature);
    }, []);

    const changeTopic = useCallback(async (isAddTopicForReplies: boolean) => {
        await chrome.storage.local.set({ isAddTopicForReplies });
        setTopicForReplies(isAddTopicForReplies);
    }, []);

    const changeLanguage = useCallback(async (language: string) => {
        await chrome.storage.local.set({ language });
        setLanguage(language);
    }, []);
    
    useEffect(() => {
        chrome.storage.local.get(['language', 'isAddSignature', 'isAddTopicForReplies', 'openAIToken']).then((state) => {
            if (state['language']) {
                setLanguage(state['language']);
            }
            if (state['isAddSignature'] != null) {
                setAddSignature(state['isAddSignature']);
            }
            if (state['isAddTopicForReplies'] != null) {
                setTopicForReplies(state['isAddTopicForReplies']);
            }
            if (state['openAIToken']) {
                setOpenAIToken(state['openAIToken']);
            }
        });
    }, []);

    const languageOptions: languageOption[] = useMemo(() =>{
        const codes = Object.keys(locales);

        return codes.map(code => ({
            value: code,
            label: locales[code][0]
        }));
    }, []);

    const warning = useMemo(() => {
        return openAIToken.length === 0 ? '⚠️' : '';
    }, [openAIToken === '']);

    return (
        <Body>
            <Logo src={logoPath} />
            <Container>
                <H1>TweetGemini Settings</H1>
                <SettingsBlock>
                    <H2>Gemini API key {warning}</H2>
                    <Space height={3} />
                    <Subtitle>Required. You can get API key from <a href="https://makersuite.google.com">Google AI studio</a>.</Subtitle>
                    <Space height={10} />
                    <TextInput type="password" placeholder='Put your secret API key here' value={openAIToken} onChange={(e) => changeOpenAIToken(e.target.value)}/>
                </SettingsBlock>
                <SettingsBlock>
                    <H2>Text Generation</H2>
                    <Space height={10} />
                    <Checkbox value={isAddSignature} onChange={changeSignature} label='Add TweetGemini Signature' />
                    <Space height={10} />
                    <Checkbox value={isAddTopicForReplies} onChange={changeTopic} label='Ask for tweet topic in replies' />
                </SettingsBlock>
                <SettingsBlock>
                    <H2>Language</H2>
                    <Space height={10} />
                    <Selector value={selectedLanguage} onChange={changeLanguage} options={languageOptions} />
                </SettingsBlock>
            </Container>
        </Body>
    )
};