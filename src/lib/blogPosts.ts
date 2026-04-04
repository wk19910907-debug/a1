export type BlogPostMeta = {
  slug: string
  date: string
  titleEn: string
  titleZh: string
  titleDe: string
  titleJa: string
  excerptEn: string
  excerptZh: string
  excerptDe: string
  excerptJa: string
  contentEn: string[]
  contentZh: string[]
  contentDe: string[]
  contentJa: string[]
}

export const blogPosts: BlogPostMeta[] = [
  {
    slug: 'the-four-harmonious-friends',
    date: '2024-01-15',
    titleEn: 'The Four Harmonious Friends',
    titleZh: '四和合',
    titleDe: 'Die vier harmonischen Freunde',
    titleJa: '四和合の友',
    excerptEn: 'A classic Tibetan Buddhist symbol of harmony, respect, and cooperation.',
    excerptZh: '藏传佛教中象征和谐、尊重与协作的经典主题。',
    excerptDe: 'Ein klassisches tibetisch-buddhistisches Symbol für Harmonie und Respekt.',
    excerptJa: '調和・敬意・協力を象徴する、チベット仏教の代表的なテーマです。',
    contentEn: [
      'The Four Harmonious Friends is one of the most beloved symbols in Tibetan Buddhist art.',
      'The story teaches cooperation, respect for elders, and harmonious coexistence.',
      'It is often displayed in homes and monasteries as a reminder of these virtues.',
    ],
    contentZh: [
      '四和合是藏传佛教艺术中最受欢迎的象征之一。',
      '这个故事强调协作、敬老与和谐共处的重要性。',
      '它常见于家庭与寺院中，提醒人们践行这些美德。',
    ],
    contentDe: [
      'Die vier harmonischen Freunde gehören zu den beliebtesten Symbolen der tibetisch-buddhistischen Kunst.',
      'Die Geschichte lehrt Zusammenarbeit, Respekt gegenüber Älteren und harmonisches Zusammenleben.',
      'Sie wird oft in Häusern und Klöstern als Erinnerung an diese Werte dargestellt.',
    ],
    contentJa: [
      '四和合の友は、チベット仏教美術で最も親しまれている象徴の一つです。',
      'この物語は、協力、年長者への敬意、そして調和ある共生を教えます。',
      'これらの徳を思い出すために、家庭や僧院に飾られることがよくあります。',
    ],
  },
  {
    slug: 'how-to-choose-the-right-thangka-for-meditation',
    date: '2024-01-10',
    titleEn: 'How to Choose the Right Thangka for Meditation',
    titleZh: '如何选择适合冥想的唐卡',
    titleDe: 'So wählen Sie die richtige Thangka für Meditation',
    titleJa: '瞑想に適したタンカの選び方',
    excerptEn: 'A practical guide to selecting a thangka that supports your meditation practice.',
    excerptZh: '一份帮助你选择适合修行唐卡的实用指南。',
    excerptDe: 'Ein praktischer Leitfaden zur Auswahl einer passenden Thangka für die Meditation.',
    excerptJa: '瞑想実践を支えるタンカを選ぶための実用ガイドです。',
    contentEn: [
      'Thangka paintings are sacred meditation tools in Tibetan Buddhism.',
      'Choose a deity that resonates with your personal practice, such as Chenrezig or Manjushri.',
      'Match the thangka size to your meditation space for daily use.',
    ],
    contentZh: [
      '在藏传佛教中，唐卡不仅是艺术品，也是重要的修行工具。',
      '建议先选择与你当下修行方向契合的本尊主题。',
      '同时根据你的修行空间选择合适尺寸，方便长期使用。',
    ],
    contentDe: [
      'Thangka-Gemälde sind im tibetischen Buddhismus heilige Meditationshilfen.',
      'Wählen Sie eine Gottheit, die zu Ihrer Praxis passt, z. B. Chenrezig oder Manjushri.',
      'Die Größe der Thangka sollte zu Ihrem Meditationsraum passen.',
    ],
    contentJa: [
      'タンカはチベット仏教における神聖な瞑想の道具です。',
      '観音や文殊など、ご自身の実践に合う尊格を選びましょう。',
      '日々使いやすいよう、瞑想空間に合ったサイズを選ぶことが大切です。',
    ],
  },
  {
    slug: 'why-thethangka-com-is-the-best-place-to-buy-authentic-thangkas',
    date: '2024-01-05',
    titleEn: 'Why TheThangka.com is the Best Place to Buy Authentic Thangkas',
    titleZh: '为什么 TheThangka.com 更值得购买',
    titleDe: 'Warum TheThangka.com authentische Thangkas bietet',
    titleJa: 'TheThangka.com が本格タンカ購入に最適な理由',
    excerptEn: 'How traditional craftsmanship and artisan support ensure authentic thangka quality.',
    excerptZh: '传统工艺与手艺人支持，如何保障唐卡的真实品质。',
    excerptDe: 'Wie traditionelle Handwerkskunst und Künstlerförderung authentische Qualität sichern.',
    excerptJa: '伝統技法と職人支援が、タンカの本物品質をどのように支えているかをご紹介します。',
    contentEn: [
      'We focus on preserving traditional painting techniques and iconographic standards.',
      'Each piece is hand-painted using mineral pigments on cotton canvas.',
      'Direct collaboration with Nepal artisans helps sustain this sacred art tradition.',
    ],
    contentZh: [
      '我们坚持传统绘制工艺与佛像造像规范。',
      '每一幅作品均由手工绘制，采用天然矿物颜料与棉布底材。',
      '与尼泊尔手艺人直接合作，持续支持这一神圣艺术传统。',
    ],
    contentDe: [
      'Wir bewahren traditionelle Maltechniken und ikonografische Standards.',
      'Jedes Werk wird handgemalt mit Mineralpigmenten auf Baumwollleinwand.',
      'Die direkte Zusammenarbeit mit Künstlern aus Nepal unterstützt diese heilige Tradition.',
    ],
    contentJa: [
      '私たちは伝統的な描画技法と図像規範の継承を重視しています。',
      'すべての作品は、天然鉱物顔料を用いて綿布に手描きで制作されます。',
      'ネパールの職人との直接協働により、この神聖な芸術伝統を支えています。',
    ],
  },
]
