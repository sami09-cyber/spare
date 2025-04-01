export interface AuthenticationResponse<T> {
  error: boolean;
  value: T | string;
}

export interface Bill {
  title: string;
  amount: number;
  category: string;
  dueDate: string;
  urgent: boolean;
  important: boolean;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}


export interface Transaction {
  account_id: string
  account_owner: string | null
  amount: number
  authorized_date: string | null
  authorized_datetime: string | null
  category: string[]
  category_id: string
  check_number: number | null
  counterparties: any
  date: string
  datetime: string | null
  iso_currency_code: string
  location: any
  logo_url: string
  merchant_entity_id: string
  merchant_name: string
  name: string
  payment_channel: string
  payment_meta: any
  pending: boolean
  pending_transaction_id: string | null
  personal_finance_category: any
  personal_finance_category_icon_url: string
  transaction_code: string | null
  transaction_id: string
  transaction_type: string
  unofficial_currency_code: string | null
  website: string
}

export interface TransactionResponse {
  request_id: string
  item: any
  accounts: Account[]
  total_transactions: number
  transactions: Transaction[]
}

export interface LinkResponse {
  requestId: string
  publicToken: string
}

export interface ExchangeTokenResponse {
  itemId: string
  requestId: string
  accessToken: string
}

export interface Balance {
  available: number | null
  current: number
  iso_currency_code: string
  limit: number | null
  unofficial_currency_code: string | null
}

export interface Account {
  account_id: string
  balances: Balance
  mask: string
  name: string
  official_name: string
  subtype: string
  type: string
}

export interface Item {
  available_products: string[]
  billed_products: string[]
  error: any
  institution_id: string
  item_id: string
  webhook: string
}

export interface BalanceResponse {
  accounts: Account[]
  item: Item
  request_id: string
}


export const environment = {
  plaidClientId: "67a5bd7ca0024d0022e46d8f",
  plaidSecret: "07cd94d1d6103946d545aab067dca7"
}


export const predefinedResponses: { keywords: string[]; responses: string[] }[] = [
  {
    keywords: ['bonjour', 'salut'],
    responses: ['Bonjour ! Comment puis-je vous aider ?', 'Salut ! Que puis-je faire pour vous ?']
  },
  {
    keywords: ['aide', 'support'],
    responses: ['Je suis là pour vous aider, quelle est votre question ?', 'N’hésitez pas à demander de l’aide, je suis à votre service.']
  },
  {
      keywords: ["budget", "budgétisation", "dépenser"],
      responses: ["Pour créer un budget efficace, commencez par noter toutes vos dépenses mensuelles et vos revenus. Je vous conseille la règle 50/30/20 : 50% pour les besoins essentiels, 30% pour les envies, et 20% pour l'épargne.", "Un bon budget commence par le suivi de vos dépenses. Utilisez notre application pour catégoriser vos dépenses et identifier les domaines où vous pouvez économiser.", "La clé d'un bon budget est la régularité dans le suivi. Utilisez nos outils de suivi pour maintenir vos objectifs financiers.",]
  },
  {
      keywords: ["épargne", "économiser", "économies"],
      responses: ["Pour optimiser votre épargne, essayez de mettre de côté au moins 20% de vos revenus mensuels. Commencez par constituer un fonds d'urgence équivalent à 3-6 mois de dépenses.", "Je vous conseille de diversifier votre épargne : livret A pour la sécurité, PEL pour un projet immobilier, et des investissements à long terme pour la retraite.", "L'épargne automatique est un excellent moyen de se constituer un capital. Programmez des virements automatiques le jour de votre salaire.",]
  },
  {
      keywords: ["dépenses", "achats", "factures"],
      responses: ["Pour réduire vos dépenses, commencez par analyser vos abonnements et services récurrents. Identifiez ceux que vous utilisez peu ou pas du tout.", "Utilisez notre fonction de suivi des dépenses pour repérer les catégories où vous dépensez le plus et établir des limites mensuelles.", "Pensez à catégoriser vos dépenses dans l'application SPARE pour mieux visualiser votre consommation mensuelle."]
  },
  {
      keywords: ["investissement", "investir", "placements"],
      responses: ["Pour débuter en investissement, privilégiez d'abord des options sûres comme le Livret A ou le PEL. Une fois votre fonds d'urgence constitué, vous pourrez envisager des placements plus diversifiés.", "L'investissement doit être adapté à votre profil de risque et vos objectifs. Commencez progressivement et diversifiez vos placements.", "N'oubliez pas que tout investissement comporte des risques. Assurez-vous de bien comprendre les produits financiers avant d'investir.",]
  },
  {
      keywords: ["dette", "crédit", "prêt", "emprunter"],
      responses: ["Pour gérer vos dettes efficacement, commencez par lister tous vos crédits avec leurs taux. Privilégiez le remboursement des dettes aux taux les plus élevés.", "Envisagez la consolidation de vos dettes si vous avez plusieurs crédits. Cela peut vous aider à obtenir un taux plus avantageux.", "Si vous avez des difficultés avec vos dettes, n'hésitez pas à contacter votre banque pour renégocier vos conditions de remboursement."]
  },
  {
    keywords: ['hello', 'hi'],
    responses: [
      'Hello! How can I help you?',
      'Hi! What can I do for you?'
    ]
  },
  {
    keywords: ['help', 'support'],
    responses: [
      'I am here to help you, what is your question?',
      'Feel free to ask for assistance, I am at your service.'
    ]
  },
  {
    keywords: ['budget', 'budgeting', 'spending'],
    responses: [
      'To create an effective budget, start by listing all your monthly expenses and income. I recommend the 50/30/20 rule: 50% for essentials, 30% for wants, and 20% for savings.',
      'A good budget begins with tracking your expenses. Use our app to categorize your spending and identify areas where you can save.',
      'The key to a good budget is regular monitoring. Use our tracking tools to keep your financial goals on track.'
    ]
  },
  {
    keywords: ['savings', 'save', 'saving'],
    responses: [
      'To optimize your savings, try setting aside at least 20% of your monthly income. Start by building an emergency fund equivalent to 3-6 months of expenses.',
      'I recommend diversifying your savings: for example, a secure savings account, a dedicated home savings plan, and long-term investments for retirement.',
      'Automatic savings is an excellent way to build capital. Schedule automatic transfers on your payday.'
    ]
  },
  {
    keywords: ['expenses', 'purchases', 'bills'],
    responses: [
      'To reduce your expenses, start by analyzing your subscriptions and recurring services. Identify those you use little or not at all.',
      'Use our expense tracking feature to spot the categories where you spend the most and set monthly limits.',
      'Consider categorizing your expenses in the SPARE app to better visualize your monthly spending.'
    ]
  },
  {
    keywords: ['investment', 'invest', 'investments'],
    responses: [
      'To begin investing, first opt for secure options such as a basic savings account or a dedicated home savings plan. Once your emergency fund is established, you can consider more diversified investments.',
      'Investment should be tailored to your risk profile and goals. Start gradually and diversify your portfolio.',
      'Remember that all investments carry risks. Make sure you fully understand financial products before investing.'
    ]
  },
  {
    keywords: ['debt', 'credit', 'loan', 'borrow'],
    responses: [
      'To manage your debts effectively, start by listing all your loans along with their interest rates. Prioritize repaying the debts with the highest rates.',
      'Consider consolidating your debts if you have multiple loans. This may help you secure a lower interest rate.',
      'If you are struggling with your debts, do not hesitate to contact your bank to renegotiate your repayment terms.'
    ]
  }
]

