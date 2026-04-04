export type ProductMeta = {
  id: string
  slug: string
  image: string
  nameZh: string
  nameEn: string
  nameJa: string
  priceCny: number
  size: string
  descriptionZh: string
  descriptionEn: string
  descriptionJa: string
  productionDays: string
}

export const productsData: ProductMeta[] = [
  {
    id: '1',
    slug: 'product1',
    image: '/images/黄财神.webp',
    nameZh: '黄财神 唐卡',
    nameEn: 'Yellow Jambhala',
    nameJa: 'イエロージャンバラ タンカ',
    priceCny: 2800,
    size: '60*45 cm',
    descriptionZh: '黄财神为五姓财神之一，主司财富，能使众生脱离贫困，财源广进。',
    descriptionEn: 'Yellow Jambhala is one of the five wealth deities and is associated with prosperity and abundance.',
    descriptionJa: 'イエロージャンバラは五財神の一尊で、繁栄と豊かさを象徴します。',
    productionDays: '15-20',
  },
  {
    id: '2',
    slug: 'product2',
    image: '/images/绿度母.webp',
    nameZh: '绿度母 唐卡',
    nameEn: 'Green Tara',
    nameJa: 'グリーンターラー タンカ',
    priceCny: 3200,
    size: '60*45 cm',
    descriptionZh: '绿度母象征慈悲与智慧，常被视作救度众生的化现。',
    descriptionEn: 'Green Tara symbolizes compassion and wisdom and is revered as a swift protector.',
    descriptionJa: 'グリーンターラーは慈悲と智慧を象徴し、迅速な守護者として敬われます。',
    productionDays: '15-20',
  },
  {
    id: '3',
    slug: 'product3',
    image: '/images/四臂观音.webp',
    nameZh: '四臂观音 唐卡',
    nameEn: 'Four-Armed Chenrezig',
    nameJa: '四臂観音 タンカ',
    priceCny: 3500,
    size: '76*56 cm',
    descriptionZh: '四臂观音代表无量慈悲，象征普度众生。',
    descriptionEn: 'Four-Armed Chenrezig represents boundless compassion and universal care.',
    descriptionJa: '四臂観音は限りない慈悲を表し、あらゆる存在への救済を象徴します。',
    productionDays: '20-25',
  },
  {
    id: '4',
    slug: 'product4',
    image: '/images/阿弥陀佛.webp',
    nameZh: '阿弥陀佛 唐卡',
    nameEn: 'Amitabha Buddha',
    nameJa: '阿弥陀如来 タンカ',
    priceCny: 3800,
    size: '60*45 cm',
    descriptionZh: '阿弥陀佛是西方极乐世界主佛，代表无量光与无量寿。',
    descriptionEn: 'Amitabha Buddha presides over the Pure Land and symbolizes infinite light and life.',
    descriptionJa: '阿弥陀如来は極楽浄土の主尊であり、無量の光と寿命を象徴します。',
    productionDays: '15-20',
  },
  {
    id: '5',
    slug: 'product5',
    image: '/images/药师佛.webp',
    nameZh: '药师佛 唐卡',
    nameEn: 'Medicine Buddha',
    nameJa: '薬師如来 タンカ',
    priceCny: 3000,
    size: '52*40 cm',
    descriptionZh: '药师佛主司医药与疗愈，常被祈请消除病苦。',
    descriptionEn: 'Medicine Buddha is associated with healing, health, and relief from suffering.',
    descriptionJa: '薬師如来は治癒と健康を司り、苦しみを和らげる存在として信仰されます。',
    productionDays: '12-18',
  },
  {
    id: '6',
    slug: 'product6',
    image: '/images/文殊.webp',
    nameZh: '文殊菩萨 唐卡',
    nameEn: 'Manjushri',
    nameJa: '文殊菩薩 タンカ',
    priceCny: 2600,
    size: '66*44 cm',
    descriptionZh: '文殊菩萨代表智慧，能开启智慧之门。',
    descriptionEn: 'Manjushri is the bodhisattva of wisdom and insight.',
    descriptionJa: '文殊菩薩は智慧を象徴し、洞察と学びを導きます。',
    productionDays: '15-20',
  },
]
