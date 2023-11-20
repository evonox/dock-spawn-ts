export type TranslationKey = keyof typeof Defaults;

export type GetLocalizerParameters<K extends TranslationKey> = K extends keyof LocalizerParameters 
    ? LocalizerParameters[K] 
    : [];

export const Defaults = {
    'CloseAll': 'Close all documents',
    'CloseAllButThis': 'Close all documents but this',
    'DefaultPanelName': 'Panel'
    //Example of parameterized translation
    // 'CloseWithName': 'Close tab {0}'
};

export interface LocalizerParameters {
    // Example
    // 'CloseWithName': [tabName: string]
}
