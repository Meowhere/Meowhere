interface KakaoLinkButton {
  title: string;
  link: {
    mobileWebUrl: string;
    webUrl: string;
  };
}

interface KakaoLinkContent {
  title: string;
  description: string;
  imageUrl: string;
  link: {
    mobileWebUrl: string;
    webUrl: string;
  };
}

interface KakaoLinkItem {
  item: string;
  itemOp: string;
}

interface KakaoLinkItemContent {
  profileText: string;
  profileImageUrl: string;
  titleImageUrl: string;
  titleImageText: string;
  titleImageCategory: string;
  items: KakaoLinkItem[];
}

interface KakaoLinkTemplate {
  objectType: 'feed' | 'list' | 'location' | 'commerce' | 'text';
  content: KakaoLinkContent;
  itemContent?: KakaoLinkItemContent;
  buttons?: KakaoLinkButton[];
}

export interface KakaoSDK {
  init: (appKey: string) => void;
  isInitialized: () => boolean;
  Share: {
    sendDefault: (template: KakaoLinkTemplate) => void;
    sendScrap: (options: { requestUrl: string }) => void;
    sendCustom: (options: { templateId: number; templateArgs?: Record<string, string> }) => void;
  };
}
