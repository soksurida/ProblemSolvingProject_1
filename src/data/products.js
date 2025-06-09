const products = [
  {
    id: 1,
    name: '네스퀵 초콜릿 드링크 180ml',
    price: '1,200원',
    image: '/images/nesquik.png',
    explain: '/images/explain/nesquik_e.jpg',
    category: '국내제품',
    description: '달콤한 맛이 매력적인 초콜릿 음료'
  },
  {
    id: 2,
    name: '허쉬 초콜릿 드링크 235ml',
    price: '1,200원',
    image: '/images/hershey.png',
    explain: '/images/explain/hershey_e.jpg',
    category: '해외제품',
    description: '진한 허쉬 초콜릿 풍미가 느껴지는 드링크'
  },
  {
    id: 3,
    name: '연세우유 마카다미아 초코우유 190ml',
    price: '1,600원',
    image: '/images/y.png',
    explain: '/images/explain/yonsei_e.jpg',
    category: '국내제품',
    description: '마카다미아와 초콜릿의 고소하고 부드러운 조화'
  },
  {
    id: 4,
    name: '서울우유 초콜릿 300ml',
    price: '1,650원',
    image: '/images/seoulmilk.jpg',
    explain: '/images/explain/seoulchoco.jpg',
    category: '국내제품',
    description: '서울우유의 정통 초콜릿 우유'
  },
  {
    id: 5,
    name: '초코 바나나킥 우유 300ml',
    price: '1,500원',
    image: '/images/kick.png',
    explain: '/images/explain/chocobanana_e.jpg',
    category: '국내제품',
    description: '바나나킥 맛과 초콜릿 우유의 색다른 만남'
  },
  {
    id: 6,
    name: '덴마크 민트초코우유 310ml',
    price: '1,500원',
    image: '/images/denmark.jpg',
    explain: '/images/explain/denmark_e.jpg',
    category: '국내제품',
    description: '민트와 초콜릿의 상쾌한 조화를 담은 드링크'
  },
  {
    id: 7,
    name: '남양유업 초코에몽 190ml',
    price: '1,600원',
    image: '/images/chocomong.png',
    explain: '/images/explain/chocoemon_e.jpg',
    category: '국내제품',
    description: '국민 초코우유로 사랑받는 초코에몽'
  },
  {
    id: 8,
    name: '빙그레 왕실초코 190ml',
    price: '1,400원',
    image: '/images/bingrae2.png',
    explain: '/images/explain/wangsil_e.jpg',
    category: '국내제품',
    description: '왕실 고급 초콜릿의 풍미'
  },
  {
    id: 9,
    name: '빙그레 설탕이 들어가지 않은 초코우유 190ml',
    price: '1,000원',
    image: '/images/binggrae.png',
    explain: '/images/explain/museoltang_e.jpg',
    category: '국내제품',
    description: '당류를 줄인 건강한 초콜릿 우유'
  },
  {
    id: 10,
    name: '상하목장 유기농 멸균 우유 코코아',
    price: '1,000원',
    image: '/images/sangha.png',
    explain: '/images/explain/youginong_e.jpg',
    category: '국내제품',
    description: '유기농 우유로 만든 순한 코코아 드링크'
  },
  {
    id: 11,
    name: '고디바 다크 초콜릿 코코아 믹스 410g',
    price: '35,000원',
    image: '/images/godiba.png',
    explain: '/images/explain/godiva_e.jpg',
    category: '해외제품',
    description: '프리미엄 고디바 초콜릿으로 만든 믹스'
  },
  {
    id: 12,
    name: '카카오랏 오리지널 200ml',
    price: '2,500원',
    image: '/images/cacaolat.png',
    explain: '/images/explain/cacaolat_e.jpg',
    category: '해외제품',
    description: '스페인의 대표적인 초콜릿 드링크'
  },
  {
    id: 13,
    name: 'Promised Land Midnight Chocolate Whole Milk',
    price: '7,000원',
    image: '/images/promised.png',
    explain: '/images/explain/promised.jpg',
    category: '해외제품',
    description: '진한 다크 초콜릿을 느낄 수 있는 미국산 우유'
  },
  {
    id: 14,
    name: '일동후디스 앤업카페 초코라떼텀블러 300ml',
    price: '2,300원',
    image: '/images/&up.png',
    explain: '/images/explain/ildong.jpg',
    category: '국내제품',
    description: '집에서 간편하게 즐길 수 있는 카페 스타일 초코라떼'
  },
  {
    id: 15,
    name: 'Lindt Hot Chocolate Frakes 210g',
    price: '20,000원',
    image: '/images/lindt.png',
    explain: '/images/explain/lindt.jpg',
    category: '해외제품',
    description: '유럽산 리치한 초콜릿 플레이크로 만든 핫초코'
  },
  {
    id: 16,
    name: 'Horizon Organic Lowfat Chocolate Milk 236ml',
    price: '5,000원',
    image: '/images/horizon.png',
    explain: '/images/explain/horizon_e.jpg',
    category: '해외제품',
    description: '미국 유기농 초코우유 브랜드 호라이즌'
  },
  {
    id: 17,
    name: '이토엔 치치야스 밀크 코코아 200ml',
    price: '2,500원',
    image: '/images/chi.png',
    explain: '/images/explain/nihonggo_e.jpg',
    category: '해외제품',
    description: '일본산 달콤한 밀크 코코아 음료'
  },
  {
    id: 18,
    name: '스위스미스 마시멜로 핫코코아 믹스 280g',
    price: '5,500원',
    image: '/images/swiss.png',
    explain: '/images/explain/swissmiss_e.jpg',
    category: '해외제품',
    description: '마시멜로가 함께 들어있는 핫초코 믹스'
  },
  {
    id: 19,
    name: '서울우유 너티초코 300ml',
    price: '1,500원',
    image: '/images/seoulnutty.png',
    explain: '/images/explain/seoulnutty.jpg',
    category: '국내제품',
    description: '고소한 견과류와 초콜릿의 환상적인 조합'
  },
  {
    id: 20,
    name: '모리나가 밀크 코코아 500ml',
    price: '4,000원',
    image: '/images/mori.png',
    explain: '/images/explain/morinaga.jpg',
    category: '해외제품',
    description: '일본 모리나가사의 진한 코코아 드링크'
  },
  {
    id: 21,
    name: '춘식이 초코우유 500ml',
    price: '2,000원',
    image: '/images/chun.png',
    explain: '/images/explain/chunsik_e.jpg',
    category: '국내제품',
    description: '귀여운 춘식이와 함께 마시는 달콤한 초코우유'
  }
];

export default products;
