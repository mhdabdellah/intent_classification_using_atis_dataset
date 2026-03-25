import type { Locale } from "@/lib/i18n";

export type Translations = {
  badge: string;
  title: string;
  subtitle: string;
  inputSettingsTitle: string;
  inputSettingsSubtitle: string;
  modes: {
    single: string;
    batch: string;
  };
  queryLabelSingle: string;
  queryLabelBatch: string;
  queryPlaceholderSingle: string;
  queryPlaceholderBatch: string;
  buttons: {
    predict: string;
    predicting: string;
    clear: string;
    loadExample: string;
  };
  api: {
    title: string;
    subtitle: string;
    label: string;
    use: string;
    test: string;
    testing: string;
    reset: string;
    current: string;
  };
  results: {
    title: string;
    predictedIntent: string;
    inputLabel: string;
    awaitingTitle: string;
    awaitingBody: string;
    batchReadyTitle: string;
    batchReadyBody: string;
    unknown: string;
    classifying: string;
  };
  errors: {
    apiEmpty: string;
    apiNotSet: string;
    queryEmpty: string;
    batchEmpty: string;
    predictionFailed: string;
    batchFailed: string;
    general: string;
    unreachable: string;
    healthFailed: (status: number) => string;
    connected: string;
    connectedWithStatus: (status: string) => string;
  };
  examples: {
    single: string;
    batch: string;
  };
  locale: {
    label: string;
  };
};

const translations: Record<Locale, Translations> = {
  en: {
    badge: "Flask + Next.js",
    title: "ATIS Intent Studio",
    subtitle: "Instant intent classification for travel-style queries",
    inputSettingsTitle: "Input settings",
    inputSettingsSubtitle: "Choose a mode and craft your travel query.",
    modes: {
      single: "Single",
      batch: "Batch"
    },
    queryLabelSingle: "Single query",
    queryLabelBatch: "Batch queries",
    queryPlaceholderSingle: "Type a travel-style question...",
    queryPlaceholderBatch: "One query per line...",
    buttons: {
      predict: "Predict intent",
      predicting: "Predicting...",
      clear: "Clear",
      loadExample: "Load example"
    },
    api: {
      title: "API connection",
      subtitle: "Point to your Flask API and verify connectivity.",
      label: "API URL",
      use: "Use API",
      test: "Test",
      testing: "Testing...",
      reset: "Reset",
      current: "Current API URL"
    },
    results: {
      title: "Results",
      predictedIntent: "Predicted intent",
      inputLabel: "Input",
      awaitingTitle: "Awaiting prediction",
      awaitingBody:
        "Run the model to see the top intent for a single query.",
      batchReadyTitle: "Batch ready",
      batchReadyBody:
        "Paste multiple queries (one per line) to get a ranked list of intents.",
      unknown: "Unknown",
      classifying: "Classifying..."
    },
    errors: {
      apiEmpty: "API URL cannot be empty.",
      apiNotSet: "API URL is not set.",
      queryEmpty: "Enter a query to classify.",
      batchEmpty: "Enter one or more queries (one per line).",
      predictionFailed: "Prediction failed.",
      batchFailed: "Batch prediction failed.",
      general: "Something went wrong.",
      unreachable: "Unable to reach the API.",
      healthFailed: (status) => `Health check failed (${status})`,
      connected: "Connected",
      connectedWithStatus: (status) => `Connected: ${status}`
    },
    examples: {
      single: "show me flights from boston to denver tomorrow morning",
      batch:
        "show flights from dallas to seattle\nwhat is the airfare from denver to new york\nbook a flight to san francisco"
    },
    locale: {
      label: "Language"
    }
  },
  fr: {
    badge: "Flask + Next.js",
    title: "ATIS Intent Studio",
    subtitle:
      "Classification instantanée des intentions pour les requêtes liées au voyage",
    inputSettingsTitle: "Paramètres d’entrée",
    inputSettingsSubtitle:
      "Choisissez un mode et rédigez votre requête de voyage.",
    modes: {
      single: "Unique",
      batch: "Lot"
    },
    queryLabelSingle: "Requête unique",
    queryLabelBatch: "Requêtes en lot",
    queryPlaceholderSingle: "Saisissez une question de voyage...",
    queryPlaceholderBatch: "Une requête par ligne...",
    buttons: {
      predict: "Prédire l’intention",
      predicting: "Prédiction...",
      clear: "Effacer",
      loadExample: "Charger un exemple"
    },
    api: {
      title: "Connexion API",
      subtitle: "Pointez vers votre API Flask et vérifiez la connectivité.",
      label: "URL de l’API",
      use: "Utiliser l’API",
      test: "Tester",
      testing: "Test...",
      reset: "Réinitialiser",
      current: "URL API actuelle"
    },
    results: {
      title: "Résultats",
      predictedIntent: "Intention prédite",
      inputLabel: "Entrée",
      awaitingTitle: "En attente de prédiction",
      awaitingBody:
        "Lancez le modèle pour voir l’intention principale pour une requête unique.",
      batchReadyTitle: "Lot prêt",
      batchReadyBody:
        "Collez plusieurs requêtes (une par ligne) pour obtenir la liste des intentions.",
      unknown: "Inconnu",
      classifying: "Classification..."
    },
    errors: {
      apiEmpty: "L’URL de l’API ne peut pas être vide.",
      apiNotSet: "L’URL de l’API n’est pas définie.",
      queryEmpty: "Saisissez une requête à classer.",
      batchEmpty: "Saisissez une ou plusieurs requêtes (une par ligne).",
      predictionFailed: "La prédiction a échoué.",
      batchFailed: "La prédiction par lot a échoué.",
      general: "Une erreur est survenue.",
      unreachable: "Impossible d’atteindre l’API.",
      healthFailed: (status) => `Échec du test de santé (${status})`,
      connected: "Connecté",
      connectedWithStatus: (status) => `Connecté : ${status}`
    },
    examples: {
      single: "montre-moi des vols de boston à denver demain matin",
      batch:
        "vols de dallas à seattle\nquel est le tarif de denver à new york\nréserver un vol pour san francisco"
    },
    locale: {
      label: "Langue"
    }
  },
  tr: {
    badge: "Flask + Next.js",
    title: "ATIS Intent Studio",
    subtitle: "Seyahat tarzı sorgular için anında niyet sınıflandırma",
    inputSettingsTitle: "Giriş ayarları",
    inputSettingsSubtitle: "Bir mod seçin ve seyahat sorgunuzu yazın.",
    modes: {
      single: "Tekli",
      batch: "Toplu"
    },
    queryLabelSingle: "Tek sorgu",
    queryLabelBatch: "Toplu sorgular",
    queryPlaceholderSingle: "Seyahat tarzı bir soru yazın...",
    queryPlaceholderBatch: "Her satıra bir sorgu...",
    buttons: {
      predict: "Niyeti tahmin et",
      predicting: "Tahmin ediliyor...",
      clear: "Temizle",
      loadExample: "Örnek yükle"
    },
    api: {
      title: "API bağlantısı",
      subtitle: "Flask API’nizi gösterin ve bağlantıyı doğrulayın.",
      label: "API URL",
      use: "API’yi kullan",
      test: "Test",
      testing: "Test ediliyor...",
      reset: "Sıfırla",
      current: "Geçerli API URL"
    },
    results: {
      title: "Sonuçlar",
      predictedIntent: "Tahmin edilen niyet",
      inputLabel: "Girdi",
      awaitingTitle: "Tahmin bekleniyor",
      awaitingBody:
        "Tek bir sorgu için en olası niyeti görmek için modeli çalıştırın.",
      batchReadyTitle: "Toplu hazır",
      batchReadyBody:
        "Birden fazla sorgu yapıştırın (her satıra bir tane) ve niyet listesini alın.",
      unknown: "Bilinmiyor",
      classifying: "Sınıflandırılıyor..."
    },
    errors: {
      apiEmpty: "API URL boş olamaz.",
      apiNotSet: "API URL ayarlı değil.",
      queryEmpty: "Sınıflandırmak için bir sorgu girin.",
      batchEmpty: "Bir veya daha fazla sorgu girin (satır başına bir tane).",
      predictionFailed: "Tahmin başarısız.",
      batchFailed: "Toplu tahmin başarısız.",
      general: "Bir şeyler ters gitti.",
      unreachable: "API’ye ulaşılamıyor.",
      healthFailed: (status) => `Sağlık kontrolü başarısız (${status})`,
      connected: "Bağlandı",
      connectedWithStatus: (status) => `Bağlandı: ${status}`
    },
    examples: {
      single: "yarın sabah boston'dan denver'e uçuşları göster",
      batch:
        "dallas'tan seattle'a uçuşları göster\ndenver'dan new york'a ücret nedir\nsan francisco'ya uçuş rezervasyonu"
    },
    locale: {
      label: "Dil"
    }
  },
  ar: {
    badge: "Flask + Next.js",
    title: "ATIS Intent Studio",
    subtitle: "تصنيف فوري للنوايا لطلبات السفر",
    inputSettingsTitle: "إعدادات الإدخال",
    inputSettingsSubtitle: "اختر وضعًا واكتب استعلام السفر.",
    modes: {
      single: "مفرد",
      batch: "دفعة"
    },
    queryLabelSingle: "استعلام مفرد",
    queryLabelBatch: "استعلامات متعددة",
    queryPlaceholderSingle: "اكتب سؤالًا متعلقًا بالسفر...",
    queryPlaceholderBatch: "استعلام واحد في كل سطر...",
    buttons: {
      predict: "تنبؤ بالنية",
      predicting: "جارٍ التنبؤ...",
      clear: "مسح",
      loadExample: "تحميل مثال"
    },
    api: {
      title: "اتصال واجهة البرمجة",
      subtitle: "وجّه إلى واجهة Flask وتحقق من الاتصال.",
      label: "عنوان API",
      use: "استخدم API",
      test: "اختبار",
      testing: "جارٍ الاختبار...",
      reset: "إعادة ضبط",
      current: "عنوان API الحالي"
    },
    results: {
      title: "النتائج",
      predictedIntent: "النية المتوقعة",
      inputLabel: "الإدخال",
      awaitingTitle: "بانتظار التنبؤ",
      awaitingBody: "شغّل النموذج لرؤية النية الأعلى لاستعلام واحد.",
      batchReadyTitle: "الدفعة جاهزة",
      batchReadyBody:
        "ألصق عدة استعلامات (واحد لكل سطر) للحصول على قائمة النوايا.",
      unknown: "غير معروف",
      classifying: "جارٍ التصنيف..."
    },
    errors: {
      apiEmpty: "لا يمكن أن يكون عنوان API فارغًا.",
      apiNotSet: "عنوان API غير مضبوط.",
      queryEmpty: "أدخل استعلامًا للتصنيف.",
      batchEmpty: "أدخل استعلامًا أو أكثر (واحد لكل سطر).",
      predictionFailed: "فشل التنبؤ.",
      batchFailed: "فشل التنبؤ الدفعي.",
      general: "حدث خطأ ما.",
      unreachable: "تعذر الوصول إلى API.",
      healthFailed: (status) => `فشل فحص الحالة (${status})`,
      connected: "تم الاتصال",
      connectedWithStatus: (status) => `تم الاتصال: ${status}`
    },
    examples: {
      single: "اعرض لي رحلات من بوسطن إلى دنفر صباح الغد",
      batch:
        "اعرض رحلات من دالاس إلى سياتل\nما هو السعر من دنفر إلى نيويورك\nاحجز رحلة إلى سان فرانسيسكو"
    },
    locale: {
      label: "اللغة"
    }
  }
};

export function getTranslations(locale: Locale): Translations {
  return translations[locale] ?? translations.en;
}
