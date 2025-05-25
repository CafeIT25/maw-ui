import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      "nav.home": "Home",
      "nav.components": "Components",
      "nav.documentation": "Documentation",
      "nav.examples": "Examples",
      
      // Hero Section
      "hero.title": "Next-Generation UI Components",
      "hero.subtitle": "Build beautiful, accessible, and performant user interfaces with our advanced component library",
      "hero.getStarted": "Get Started",
      "hero.viewComponents": "View Components",
      
      // Language Switcher
      "language.switch": "Language",
      "language.english": "English",
      "language.japanese": "日本語",
      
      // Component Categories
      "category.basic": "Basic Components",
      "category.forms": "Form Components",
      "category.data": "Data Display",
      "category.navigation": "Navigation",
      "category.feedback": "Feedback",
      "category.layout": "Layout",
      "category.advanced": "Advanced",
      
      // Component Names
      "component.button": "Button",
      "component.input": "Input",
      "component.card": "Card",
      "component.modal": "Modal",
      "component.tabs": "Tabs",
      "component.accordion": "Accordion",
      "component.avatar": "Avatar",
      "component.badge": "Badge",
      "component.carousel": "Carousel",
      "component.commandPalette": "Command Palette",
      "component.datePicker": "Date Picker",
      "component.dataTable": "Data Table",
      "component.dataVisualization": "Data Visualization",
      "component.advancedDataViz": "Advanced Data Visualization",
      "component.fileManager": "File Manager",
      "component.kanbanBoard": "Kanban Board",
      "component.notification": "Notification",
      "component.progress": "Progress",
      "component.richTextEditor": "Rich Text Editor",
      "component.select": "Select",
      "component.slider": "Slider",
      "component.smartForm": "Smart Form",
      "component.timeline": "Timeline",
      "component.toast": "Toast",
      
      // Component Descriptions
      "desc.button": "Versatile button component with multiple variants and states",
      "desc.input": "Advanced input field with validation and accessibility features",
      "desc.card": "Flexible card component for content organization",
      "desc.modal": "Accessible modal dialog with smooth animations",
      "desc.tabs": "Interactive tab component with keyboard navigation",
      "desc.accordion": "Collapsible content sections with smooth transitions",
      "desc.avatar": "User avatar component with fallback options",
      "desc.badge": "Status and notification badges with customizable styles",
      "desc.carousel": "Touch-friendly carousel with infinite scroll",
      "desc.commandPalette": "Quick action command palette with search",
      "desc.datePicker": "Intuitive date picker with calendar view",
      "desc.dataTable": "Feature-rich data table with sorting and filtering",
      "desc.dataVisualization": "Interactive charts and graphs",
      "desc.advancedDataViz": "Advanced data visualization with real-time updates",
      "desc.fileManager": "Complete file management interface",
      "desc.kanbanBoard": "Drag-and-drop kanban board for project management",
      "desc.notification": "Toast notifications with queue management",
      "desc.progress": "Progress indicators with multiple styles",
      "desc.richTextEditor": "WYSIWYG rich text editor with formatting tools",
      "desc.select": "Enhanced select dropdown with search and multi-select",
      "desc.slider": "Range slider with precise value control",
      "desc.smartForm": "Intelligent form with dynamic validation",
      "desc.timeline": "Visual timeline component for events",
      "desc.toast": "Lightweight toast notifications",
      
      // Common Actions
      "action.copy": "Copy",
      "action.copied": "Copied!",
      "action.view": "View",
      "action.edit": "Edit",
      "action.delete": "Delete",
      "action.save": "Save",
      "action.cancel": "Cancel",
      "action.close": "Close",
      "action.open": "Open",
      "action.search": "Search",
      "action.filter": "Filter",
      "action.sort": "Sort",
      "action.export": "Export",
      "action.import": "Import",
      
      // Footer
      "footer.description": "A modern UI component library built for the future",
      "footer.quickLinks": "Quick Links",
      "footer.resources": "Resources",
      "footer.community": "Community",
      "footer.github": "GitHub",
      "footer.documentation": "Documentation",
      "footer.examples": "Examples",
      "footer.blog": "Blog",
      "footer.support": "Support",
      "footer.discord": "Discord",
      "footer.twitter": "Twitter",
      "footer.allRightsReserved": "All rights reserved.",
      
      // Code Examples
      "code.installation": "Installation",
      "code.usage": "Usage",
      "code.props": "Props",
      "code.examples": "Examples",
      
      // Status Messages
      "status.loading": "Loading...",
      "status.error": "An error occurred",
      "status.success": "Success!",
      "status.noData": "No data available",
      "status.notFound": "Not found",
    }
  },
  ja: {
    translation: {
      // Navigation
      "nav.home": "ホーム",
      "nav.components": "コンポーネント",
      "nav.documentation": "ドキュメント",
      "nav.examples": "サンプル",
      
      // Hero Section
      "hero.title": "次世代UIコンポーネント",
      "hero.subtitle": "美しく、アクセシブルで、高性能なユーザーインターフェースを構築するための先進的なコンポーネントライブラリ",
      "hero.getStarted": "始める",
      "hero.viewComponents": "コンポーネントを見る",
      
      // Language Switcher
      "language.switch": "言語",
      "language.english": "English",
      "language.japanese": "日本語",
      
      // Component Categories
      "category.basic": "基本コンポーネント",
      "category.forms": "フォームコンポーネント",
      "category.data": "データ表示",
      "category.navigation": "ナビゲーション",
      "category.feedback": "フィードバック",
      "category.layout": "レイアウト",
      "category.advanced": "高度な機能",
      
      // Component Names
      "component.button": "ボタン",
      "component.input": "入力フィールド",
      "component.card": "カード",
      "component.modal": "モーダル",
      "component.tabs": "タブ",
      "component.accordion": "アコーディオン",
      "component.avatar": "アバター",
      "component.badge": "バッジ",
      "component.carousel": "カルーセル",
      "component.commandPalette": "コマンドパレット",
      "component.datePicker": "日付ピッカー",
      "component.dataTable": "データテーブル",
      "component.dataVisualization": "データ可視化",
      "component.advancedDataViz": "高度なデータ可視化",
      "component.fileManager": "ファイルマネージャー",
      "component.kanbanBoard": "カンバンボード",
      "component.notification": "通知",
      "component.progress": "プログレス",
      "component.richTextEditor": "リッチテキストエディター",
      "component.select": "セレクト",
      "component.slider": "スライダー",
      "component.smartForm": "スマートフォーム",
      "component.timeline": "タイムライン",
      "component.toast": "トースト",
      
      // Component Descriptions
      "desc.button": "複数のバリエーションと状態を持つ汎用的なボタンコンポーネント",
      "desc.input": "バリデーションとアクセシビリティ機能を備えた高度な入力フィールド",
      "desc.card": "コンテンツ整理のための柔軟なカードコンポーネント",
      "desc.modal": "スムーズなアニメーション付きのアクセシブルなモーダルダイアログ",
      "desc.tabs": "キーボードナビゲーション対応のインタラクティブなタブコンポーネント",
      "desc.accordion": "スムーズなトランジション付きの折りたたみ可能なコンテンツセクション",
      "desc.avatar": "フォールバックオプション付きのユーザーアバターコンポーネント",
      "desc.badge": "カスタマイズ可能なスタイルのステータスと通知バッジ",
      "desc.carousel": "無限スクロール対応のタッチフレンドリーなカルーセル",
      "desc.commandPalette": "検索機能付きのクイックアクションコマンドパレット",
      "desc.datePicker": "カレンダービュー付きの直感的な日付ピッカー",
      "desc.dataTable": "ソートとフィルタリング機能を備えた高機能データテーブル",
      "desc.dataVisualization": "インタラクティブなチャートとグラフ",
      "desc.advancedDataViz": "リアルタイム更新対応の高度なデータ可視化",
      "desc.fileManager": "完全なファイル管理インターフェース",
      "desc.kanbanBoard": "プロジェクト管理用のドラッグ&ドロップ対応カンバンボード",
      "desc.notification": "キュー管理機能付きのトースト通知",
      "desc.progress": "複数のスタイルを持つプログレスインジケーター",
      "desc.richTextEditor": "フォーマットツール付きのWYSIWYGリッチテキストエディター",
      "desc.select": "検索と複数選択機能を備えた拡張セレクトドロップダウン",
      "desc.slider": "精密な値制御が可能なレンジスライダー",
      "desc.smartForm": "動的バリデーション機能付きのインテリジェントフォーム",
      "desc.timeline": "イベント用のビジュアルタイムラインコンポーネント",
      "desc.toast": "軽量なトースト通知",
      
      // Common Actions
      "action.copy": "コピー",
      "action.copied": "コピーしました！",
      "action.view": "表示",
      "action.edit": "編集",
      "action.delete": "削除",
      "action.save": "保存",
      "action.cancel": "キャンセル",
      "action.close": "閉じる",
      "action.open": "開く",
      "action.search": "検索",
      "action.filter": "フィルター",
      "action.sort": "ソート",
      "action.export": "エクスポート",
      "action.import": "インポート",
      
      // Footer
      "footer.description": "未来のために構築されたモダンなUIコンポーネントライブラリ",
      "footer.quickLinks": "クイックリンク",
      "footer.resources": "リソース",
      "footer.community": "コミュニティ",
      "footer.github": "GitHub",
      "footer.documentation": "ドキュメント",
      "footer.examples": "サンプル",
      "footer.blog": "ブログ",
      "footer.support": "サポート",
      "footer.discord": "Discord",
      "footer.twitter": "Twitter",
      "footer.allRightsReserved": "All rights reserved.",
      
      // Code Examples
      "code.installation": "インストール",
      "code.usage": "使用方法",
      "code.props": "プロパティ",
      "code.examples": "サンプル",
      
      // Status Messages
      "status.loading": "読み込み中...",
      "status.error": "エラーが発生しました",
      "status.success": "成功！",
      "status.noData": "データがありません",
      "status.notFound": "見つかりません",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n; 