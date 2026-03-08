// Mock Data for Restaurants
const restaurants = [
  {
    id: 1,
    name: "광화문 김치찌개 본점",
    area: "Seoul",
    category: "Korean",
    rating: 4.8,
    reviews: 1240,
    price: "₩10,000 ~ ₩20,000",
    image: "https://placehold.co/400x400/D9534F/FFF?text=Kimchi+Stew",
    description: "3대째 이어오는 전통 김치찌개 맛집. 깊은 국물 맛이 일품입니다.",
    new: false
  },
  {
    id: 2,
    name: "부산 자갈치 횟집",
    area: "Busan",
    category: "Korean",
    rating: 4.6,
    reviews: 850,
    price: "₩30,000 ~ ₩50,000",
    image: "https://placehold.co/400x400/007bff/FFF?text=Sashimi",
    description: "싱싱한 활어회와 매운탕을 즐길 수 있는 부산의 명소.",
    new: false
  },
  {
    id: 3,
    name: "제주 흑돼지 랜드",
    area: "Jeju",
    category: "Korean",
    rating: 4.9,
    reviews: 2100,
    price: "₩20,000 ~ ₩40,000",
    image: "https://placehold.co/400x400/333/FFF?text=Jeju+Pork",
    description: "제주도 흑돼지 직화구이 전문점. 육즙이 살아있습니다.",
    new: false
  },
  {
    id: 4,
    name: "홍대 스시 오마카세",
    area: "Seoul",
    category: "Japanese",
    rating: 4.7,
    reviews: 530,
    price: "₩50,000 ~ ₩100,000",
    image: "https://placehold.co/400x400/orange/FFF?text=Sushi",
    description: "가성비 최고의 엔트리급 오마카세.",
    new: true
  },
  {
    id: 5,
    name: "이태원 버거 팩토리",
    area: "Seoul",
    category: "Western",
    rating: 4.5,
    reviews: 980,
    price: "₩10,000 ~ ₩15,000",
    image: "https://placehold.co/400x400/brown/FFF?text=Burger",
    description: "육즙 가득한 수제 패티와 신선한 야채의 조화.",
    new: false
  },
  {
    id: 6,
    name: "강남 모던 차이",
    area: "Seoul",
    category: "Chinese",
    rating: 4.4,
    reviews: 320,
    price: "₩20,000 ~ ₩30,000",
    image: "https://placehold.co/400x400/red/FFF?text=Chinese",
    description: "트렌디한 분위기에서 즐기는 퓨전 중식.",
    new: true
  },
  {
    id: 7,
    name: "성수동 감성 카페",
    area: "Seoul",
    category: "Cafe",
    rating: 4.3,
    reviews: 150,
    price: "₩5,000 ~ ₩10,000",
    image: "https://placehold.co/400x400/pink/FFF?text=Cafe",
    description: "인스타 감성 가득한 인테리어와 스페셜티 커피.",
    new: true
  }
];

// Utility: Generate Star Rating HTML
function getStarRatingHTML(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let html = '';
  
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      html += '★';
    } else if (i === fullStars && hasHalfStar) {
      html += '☆'; // Simplification, ideally use half-star icon
    } else {
      html += '☆';
    }
  }
  return html;
}

// Render Function: Restaurant List (Ranking)
function renderRankingList() {
  const container = document.getElementById('ranking-list');
  if (!container) return;
  
  // Sort by rating desc
  const sorted = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 5);
  
  container.innerHTML = sorted.map(rest => `
    <div class="restaurant-card">
      <img src="${rest.image}" alt="${rest.name}" class="card-img" loading="lazy">
      <div class="card-content">
        <div class="card-header">
          <a href="#" class="restaurant-name" onclick="alert('상세 페이지 준비중: ${rest.name}')">${rest.name}</a>
          <span class="card-meta">${rest.area} &bull; ${rest.category}</span>
        </div>
        <div class="rating-area">
          <span class="score">${rest.rating}</span>
          <span class="stars">${getStarRatingHTML(rest.rating)}</span>
          <span class="review-count">(${rest.reviews}명 참여)</span>
        </div>
        <div class="card-info">
          <span class="price-range">💰 ${rest.price}</span>
          <p>${rest.description}</p>
        </div>
      </div>
    </div>
  `).join('');
}

// Render Function: New Arrivals
function renderNewArrivals() {
  const container = document.getElementById('new-list');
  if (!container) return;

  const newRest = restaurants.filter(r => r.new);

  container.innerHTML = newRest.map(rest => `
    <div class="restaurant-card">
      <img src="${rest.image}" alt="${rest.name}" class="card-img" loading="lazy">
      <div class="card-content">
        <a href="#" class="restaurant-name" onclick="alert('상세 페이지 준비중: ${rest.name}')">${rest.name}</a>
        <div class="rating-area">
          <span class="score">${rest.rating}</span>
          <span class="stars">${getStarRatingHTML(rest.rating)}</span>
        </div>
        <div class="card-meta">${rest.area} &bull; ${rest.category}</div>
      </div>
    </div>
  `).join('');
}

// Search Handler
function handleSearch() {
  const area = document.getElementById('area-select').value;
  const keyword = document.getElementById('search-input').value.toLowerCase();
  
  alert(`검색 기능 데모:\n지역: ${area || '전국'}\n키워드: ${keyword || '전체'}\n\n(실제 검색 로직은 백엔드 연동 필요)`);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  renderRankingList();
  renderNewArrivals();

  document.getElementById('search-btn').addEventListener('click', handleSearch);
  
  // Enter key search
  document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
});

// Expose handleNav for inline onclicks (if needed, though standard events are better)
window.handleNav = function(event, page) {
  event.preventDefault();
  if(page === 'home') {
    window.location.reload();
  }
};
