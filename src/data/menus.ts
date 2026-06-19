/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  cuisine: '한식' | '중식' | '양식' | '일식';
  temperature: '따뜻한 음식' | '차가운 음식';
  spiciness: '매운 음식' | '안매운 음식';
  emoji: string;
  description: string;
  ingredients: string[];
  hashTags: string[];
}

export const menus: MenuItem[] = [
  // --- 한식 (Korean) ---
  {
    id: 'k1',
    name: '김치찌개',
    cuisine: '한식',
    temperature: '따뜻한 음식',
    spiciness: '매운 음식',
    emoji: '🥘',
    description: '잘 익은 김치와 두툼한 돼지고기를 푹 끓여내어 깊고 얼큰한 맛이 일품인 대표 한식 찌개',
    ingredients: ['배추김치', '돼지고기', '두부', '대파', '양파'],
    hashTags: ['얼큰한', '밥도둑', '한국인의소울푸드']
  },
  {
    id: 'k2',
    name: '부대찌개',
    cuisine: '한식',
    temperature: '따뜻한 음식',
    spiciness: '매운 음식',
    emoji: '🍲',
    description: '햄, 소시지, 라면사리, 떡 등을 푸짐하게 넣어 남녀노소 모두가 좋아하는 얼큰하고 진한 전골 요리',
    ingredients: ['스팸/소시지', '라면사리', '김치', '베이크드빈스', '치즈'],
    hashTags: ['푸짐한', '술안주', '라면사리듬뿍']
  },
  {
    id: 'k3',
    name: '닭볶음탕',
    cuisine: '한식',
    temperature: '따뜻한 음식',
    spiciness: '매운 음식',
    emoji: '🐔',
    description: '닭고기와 감자, 당근을 매콤한 양념장에 졸여내어 매콤달콤한 맛과 든든한 식감을 자랑하는 요리',
    ingredients: ['닭고기', '감자', '당근', '청양고추', '비법양념'],
    hashTags: ['매콤달콤', '든든한한끼', '감자조림']
  },
  {
    id: 'k4',
    name: '제육볶음',
    cuisine: '한식',
    temperature: '따뜻한 음식',
    spiciness: '매운 음식',
    emoji: '🥩',
    description: '얇게 썬 돼지고기를 매콤한 고추장 양념에 불맛 가득 빠르게 볶아낸 최고의 쌈밥 궁합 반찬',
    ingredients: ['돼지앞다리살', '양파', '당근', '고추장양념', '통깨'],
    hashTags: ['불맛', '쌈채소필수', '든든한고기']
  },
  {
    id: 'k5',
    name: '삼계탕',
    cuisine: '한식',
    temperature: '따뜻한 음식',
    spiciness: '안매운 음식',
    emoji: '🥣',
    description: '어린 닭에 인삼, 대추, 찹쌀 등을 넣어 오랫동안 고아 가슴 속까지 깊고 든든하게 채우는 최고의 보양식',
    ingredients: ['영계', '인삼', '대추', '찹쌀', '마늘'],
    hashTags: ['이열치열', '기력회복', '보양식']
  },
  {
    id: 'k6',
    name: '소불고기',
    cuisine: '한식',
    temperature: '따뜻한 음식',
    spiciness: '안매운 음식',
    emoji: '🍖',
    description: '얇게 저민 소고기를 달콤 짭조름한 간장 양념에 재웠다가 부드럽고 가볍게 자작하게 졸여 먹는 대중적인 요리',
    ingredients: ['소고기', '팽이버섯', '당면', '대파', '궁중간장양념'],
    hashTags: ['달콤짭조름', '어린이추천', '남녀노소']
  },
  {
    id: 'k7',
    name: '비빔냉면',
    cuisine: '한식',
    temperature: '차가운 음식',
    spiciness: '매운 음식',
    emoji: '🍜',
    description: '매콤새콤한 고추장 비빔 양념장과 쫄깃하고 얇은 면발을 참기름과 무김치와 함께 싹싹 비벼 먹는 여름 별미',
    ingredients: ['메밀면', '비빔새콤양념장', '오이', '삶은계란', '쌈무'],
    hashTags: ['매콤새콤', '면요리', '시원 짜릿']
  },
  {
    id: 'k8',
    name: '물냉면',
    cuisine: '한식',
    temperature: '차가운 음식',
    spiciness: '안매운 음식',
    emoji: '❄️',
    description: '살얼음이 동동 뜨는 시원하고 깊은 동치미 육수에 쫄깃한 면발을 담아 머리 속까지 시원하게 씻어내리는 면 요리',
    ingredients: ['냉면면발', '동치미육수', '삶은계란', '쌈무', '식초/겨자'],
    hashTags: ['살얼음동동', '가슴속까지시원', '여름대명사']
  },
  {
    id: 'k9',
    name: '물회',
    cuisine: '한식',
    temperature: '차가운 음식',
    spiciness: '매운 음식',
    emoji: '🐟',
    description: '신선한 횟감과 채소를 매콤하고 짜릿한 초장 육수에 얼음과 함께 말아 숟가락으로 시원하게 떠먹는 활력 가득한 요리',
    ingredients: ['신선한 활어회', '오이/배', '초장양념육수', '각얼음', '소면사리'],
    hashTags: ['바다의맛', '새콤매콤', '소면말이 필수']
  },
  {
    id: 'k10',
    name: '콩국수',
    cuisine: '한식',
    temperature: '차가운 음식',
    spiciness: '안매운 음식',
    emoji: '🥛',
    description: '멧돌에 부드럽게 갈아낸 진하고 차가운 콩국물에 국수를 말아 소금이나 설탕을 곁들여 담백하고 고소하게 즐기는 영양식',
    ingredients: ['중면', '백태/진한콩국물', '오이고명', '방울토마토', '깨'],
    hashTags: ['고소함의극치', '소금파vs설탕파', '웰빙푸드']
  },
  {
    id: 'k11',
    name: '육개장',
    cuisine: '한식',
    temperature: '따뜻한 음식',
    spiciness: '매운 음식',
    emoji: '🌶️',
    description: '푹 곤 소고기 양지머리를 가늘게 찢어 고사리, 숙주나물, 대파를 듬뿍 넣고 얼큰하게 끓인 한국 정통 보양 탕 요리',
    ingredients: ['소고기양지', '고사리', '숙주나물', '대파', '고추기름'],
    hashTags: ['얼큰칼칼', '해장완벽', '고사리듬뿍']
  },
  {
    id: 'k12',
    name: '도토리묵사발',
    cuisine: '한식',
    temperature: '차가운 음식',
    spiciness: '안매운 음식',
    emoji: '🥄',
    description: '잘게 썬 시원하고 아삭한 김치와 부드러운 도토리묵을 차가운 냉면 육수에 말아 산뜻하고 가볍게 입맛을 살리는 도토리묵 요리',
    ingredients: ['도토리묵', '차가운 육수', '아삭한 김치고명', '김가루', '참기름'],
    hashTags: ['다이어트식단', '새콤고소', '가벼운한끼']
  },

  // --- 중식 (Chinese) ---
  {
    id: 'c1',
    name: '짬뽕',
    cuisine: '중식',
    temperature: '따뜻한 음식',
    spiciness: '매운 음식',
    emoji: '🍜',
    description: '강한 불에 볶은 불맛 해산물과 신선한 채소를 얼큰한 국물과 탱탱한 수타 면발에 함께 끓여낸 중식 환상의 대표 주자',
    ingredients: ['중화면', '오징어/홍합', '목이버섯', '양파', '고춧가루/불맛'],
    hashTags: ['강렬한불맛', '얼큰해장', '짜장단짝']
  },
  {
    id: 'c2',
    name: '마라탕',
    cuisine: '중식',
    temperature: '따뜻한 음식',
    spiciness: '매운 음식',
    emoji: '🔥',
    description: '중국 사천 지방 특유의 화끈하게 알싸하고 매운 마라 육수에 원하는 채소, 고기, 두부 등을 샤브하여 즐기는 중독성 최강의 요리',
    ingredients: ['마라소스', '푸주/건두부', '중국당면', '소고기', '청경채/숙주'],
    hashTags: ['혈중마라농도', '얼얼한매운맛', '중독성폭발']
  },
  {
    id: 'c3',
    name: '짜장면',
    cuisine: '중식',
    temperature: '따뜻한 음식',
    spiciness: '안매운 음식',
    emoji: '🍛',
    description: '달콤하고 단백한 춘장을 기름에 볶아 신선한 돼지고기, 채소와 함께 볶아 갓 삶아낸 쫄깃한 한 그릇의 국민 면 요리',
    ingredients: ['중화면', '춘장', '돼지고기', '양파/양배추', '단무지'],
    hashTags: ['달콤담백', '영원한일등', '이삿날필수']
  },
  {
    id: 'c4',
    name: '탕수육',
    cuisine: '중식',
    temperature: '따뜻한 음식',
    spiciness: '안매운 음식',
    emoji: '🐷',
    description: '바삭하게 잘 튀겨낸 두툼한 돼지고기에 새콤달콤하고 꾸덕한 전분 소스를 얹어 어깨를 들썩이게 만드는 중식 대표 고기 요리',
    ingredients: ['돼지등심', '튀김옷', '파인애플/오이소스', '전분'],
    hashTags: ['부먹찍먹', '겉바속촉', '모두의고기']
  },
  {
    id: 'c5',
    name: '마파두부',
    cuisine: '중식',
    temperature: '따뜻한 음식',
    spiciness: '매운 음식',
    emoji: '🍢',
    description: '부드러운 연두부와 다진 돼지고기를 매콤하고 화한 두반장 소스에 조화롭게 졸여 따뜻한 밥 위에 쓱쓱 비벼 먹기 일품인 사천 요리',
    ingredients: ['연두부', '다진돼지고기', '두반장', '파기름', '전분물'],
    hashTags: ['밥도둑사천', '부드러운두부', '풍미가득']
  },
  {
    id: 'c6',
    name: '중국식 냉면',
    cuisine: '중식',
    temperature: '차가운 음식',
    spiciness: '안매운 음식',
    emoji: '🥒',
    description: '새우, 해파리, 오향장육 등 호화로운 고명과 시원한 육수에 특유의 고소한 땅콩 소스를 풀어 오묘하고 진한 바디감을 느끼는 요리',
    ingredients: ['중화면', '닭고기육수', '해파리/새우', '땅콩소스', '겨자'],
    hashTags: ['땅콩소스의마법', '이색냉면', '해산물고명']
  },

  // --- 양식 (Western) ---
  {
    id: 'w1',
    name: '매콤 토마토 파스타 (아라비아따)',
    cuisine: '양식',
    temperature: '따뜻한 음식',
    spiciness: '매운 음식',
    emoji: '🍝',
    description: '진한 토마토 소스에 페퍼론치노와 마늘을 듬뿍 더해 이탈리아어로 화난 것처럼 매콤하게 입맛을 당기는 풍미 가득한 파스타',
    ingredients: ['스파게티면', '홀토마토소스', '페퍼론치노', '마늘', '베이컨'],
    hashTags: ['화끈한파스타', '토마토의산뜻함', '이탈리안의매운맛']
  },
  {
    id: 'w2',
    name: '까르보나라 파스타',
    cuisine: '양식',
    temperature: '따뜻한 음식',
    spiciness: '안매운 음식',
    emoji: '🧀',
    description: '크림 또는 정통 베이컨 계란과 고소한 파마산 치즈의 풍미가 어우러져 한없이 입안 가득 감싸 안는 부드럽고 진한 크림 요리',
    ingredients: ['스파게티면', '생크림/계란노른자', '베이컨', '파마산치즈', '흑후추'],
    hashTags: ['고소꾸덕', '크림소스스페셜', '취향저격치즈']
  },
  {
    id: 'w3',
    name: '페퍼로니 피자',
    cuisine: '양식',
    temperature: '따뜻한 음식',
    spiciness: '매운 음식',
    emoji: '🍕',
    description: '풍부한 모짜렐라 치즈 위에 짭조름하고 스파이시한 페퍼로니 소시지를 가득 메우고 핫소스를 뿌려 먹는 완벽한 맥주 메이트 피자',
    ingredients: ['피자도우', '토마토 페이스트', '모짜렐라치즈', '페퍼로니소시지', '크러쉬드페퍼'],
    hashTags: ['피맥보스', '스파이시소시지', '짭조름정통']
  },
  {
    id: 'w4',
    name: '고르곤졸라 피자',
    cuisine: '양식',
    temperature: '따뜻한 음식',
    spiciness: '안매운 음식',
    emoji: '🍯',
    description: '푸른 곰팡이 특유의 고르곤졸라 치즈 향을 가볍게 입혀 얇은 도우에 굽고 향긋하고 달콤함의 절정인 꿀을 찍어 먹는 고소 단맛 피자',
    ingredients: ['씬도우', '고르곤졸라치즈', '아몬드슬라이스', '자연꿀'],
    hashTags: ['단짠단짠', '디저트피자', '꿀에퐁당']
  },
  {
    id: 'w5',
    name: '시저 샐러드',
    cuisine: '양식',
    temperature: '차가운 음식',
    spiciness: '안매운 음식',
    emoji: '🥗',
    description: '아삭아삭하고 신선한 로메인 상추에 올리브유와 파마산 크림 드레싱, 크루통 등을 얹어 가볍고 시원하게 입맛을 돋우는 정석 샐러드',
    ingredients: ['로메인 상추', '시저드레싱', '크루통', '파마산치즈가루', '베이컨 비츠'],
    hashTags: ['가벼운브런치', '아삭아삭로메인', '산뜻함뿜뿜']
  },
  {
    id: 'w6',
    name: '냉 파스타 샐러드',
    cuisine: '양식',
    temperature: '차가운 음식',
    spiciness: '안매운 음식',
    emoji: '🥣',
    description: '차가운 푸실리 또는 스파게티면에 올리브 오일, 발사믹 드레싱, 신선한 방울토마토와 바질을 섞어 기분 좋아지도록 산뜻한 요리',
    ingredients: ['숏파스타/푸실리', '발사믹/오리엔탈 드레싱', '방울토마토', '모짜렐라치즈펄'],
    hashTags: ['시원한파스타', '산뜻상큼', '유럽식여름건강']
  },

  // --- 일식 (Japanese) ---
  {
    id: 'j1',
    name: '카라구치 라멘',
    cuisine: '일식',
    temperature: '따뜻한 음식',
    spiciness: '매운 음식',
    emoji: '🍜',
    description: '진하게 우려낸 사골 육수에 칼칼한 카라 미소 양념을 풀어 두툼한 차슈와 아지타마고를 곁들인 뜨겁고 강력한 매운 일식 라멘',
    ingredients: ['생면', '매콤돈골육수', '차슈', '온천계란', '숙주나물'],
    hashTags: ['화끈한원샷', '일본식라멘', '차슈가사르르']
  },
  {
    id: 'j2',
    name: '돈코츠 라멘',
    cuisine: '일식',
    temperature: '따뜻한 음식',
    spiciness: '안매운 음식',
    emoji: '🍥',
    description: '오랫동안 뽀얗게 고아낸 돼지뼈 육수의 한없이 깊고 고소함이 쫄깃한 라멘과 가슴 속 끝을 뜨겁게 덮어주는 정통 일식 라멘',
    ingredients: ['라멘면발', '돈골사골육수', '차슈', '아지타마고', '죽순'],
    hashTags: ['담백꾸덕육수', '소울라멘', '뜨끈하고고소함']
  },
  {
    id: 'j3',
    name: '돈카츠',
    cuisine: '일식',
    temperature: '따뜻한 음식',
    spiciness: '안매운 음식',
    emoji: '🥩',
    description: '두툼하고 엄선된 등심이나 안심 신선육에 바삭한 빵가루를 입혀 고온에 육즙 가득하게 튀겨낸 정통 일식 돈까스',
    ingredients: ['돼지안심/등심', '생빵가루', '일식특제돈카츠소스', '양배추샐러드'],
    hashTags: ['겉바속촉생고기', '바삭한빵가루', '고추냉이환상궁합']
  },
  {
    id: 'j4',
    name: '회덮밥',
    cuisine: '일식',
    temperature: '차가운 음식',
    spiciness: '매운 음식',
    emoji: '🍚',
    description: '아삭한 채소와 신선한 큐브 활어회 고명을 듬뿍 얹어 새콤하고 화끈한 초고추장에 참기름 한 방울과 슥슥 비벼 먹는 차가운 대형 식사',
    ingredients: ['흰쌀밥/식힌밥', '큐브참치/광어', '신선한채소슬라이스', '비법초고추장', '날치알'],
    hashTags: ['새콤매콤덮밥', '신선회폭탄', '날치알톡톡']
  },
  {
    id: 'j5',
    name: '스시 (초밥)',
    cuisine: '일식',
    temperature: '차가운 음식',
    spiciness: '안매운 음식',
    emoji: '🍣',
    description: '초를 가미한 단맛 도는 밥 위에 활어, 연어, 새우 등 가장 신선한 재료를 얹어 장인처럼 한 알씩 집어 먹는 세계적인 정통 요리',
    ingredients: ['초대용 초대리밥', '생선 필렛', '고추냉이', '기꼬만간장', '초생강'],
    hashTags: ['단정하고정갈', '스시투어', '간장에살짝']
  },
  {
    id: 'j6',
    name: '판모밀소바',
    cuisine: '일식',
    temperature: '차가운 음식',
    spiciness: '안매운 음식',
    emoji: '🥢',
    description: '대나무 판 위에 정갈하게 올린 시원한 메밀 국수를 가쓰오부시 향 풍기는 시원한 쯔유 육수에 간 무와 파를 듬뿍 넣어 적셔 먹는 여름 면',
    ingredients: ['메밀국수', '가쓰오부시 비법 쯔유', '강판에간무', '송송다진파', '와사비'],
    hashTags: ['메밀소바쯔유', '여름순삭', '깔끔담백개운']
  }
];
