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
    description: "3대째 이어오는 전통 김치찌개 맛집. 깊은 국물 맛이 일품입니다. 국내산 배추와 돼지고기만을 고집하여 깔끔하고 깊은 맛을 냅니다.",
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
    description: "싱싱한 활어회와 매운탕을 즐길 수 있는 부산의 명소. 매일 아침 직송되는 신선한 해산물로 최고의 맛을 보장합니다.",
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
    description: "제주도 흑돼지 직화구이 전문점. 육즙이 살아있는 두툼한 고기를 참숯 향과 함께 즐겨보세요.",
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
    description: "가성비 최고의 엔트리급 오마카세. 셰프가 정성스럽게 쥐어주는 한 점 한 점의 감동을 느껴보세요.",
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
    description: "육즙 가득한 수제 패티와 신선한 야채의 조화. 매일 직접 굽는 번의 풍미가 일품입니다.",
    new: false
  }
];

// Router: Simple dynamic page switcher
function navigateTo(pageId, category = 'all') {
  const app = document.getElementById('app');
  const template = document.getElementById(`tpl-${pageId}`);
  
  if (!template) return;
  
  // Update Active Link State
  document.querySelectorAll('[data-page]').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-page') === pageId);
  });

  // Inject Template
  app.innerHTML = '';
  app.appendChild(template.content.cloneNode(true));

  // Initialize Page Specific Logic
  if (pageId === 'home') {
    renderRankingList(category);
    // Trigger AdSense if it exists
    try { (adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
  }

  // Scroll to top
  window.scrollTo(0, 0);
}

// Utility: Star Rating
function getStarRatingHTML(rating) {
  const fullStars = Math.floor(rating);
  let html = '';
  for (let i = 0; i < 5; i++) {
    html += i < fullStars ? '★' : '☆';
  }
  return html;
}

// Render Ranking
function renderRankingList(categoryFilter = 'all') {
  const container = document.getElementById('ranking-list');
  if (!container) return;

  const filtered = categoryFilter === 'all' 
    ? restaurants 
    : restaurants.filter(r => r.category === categoryFilter);

  const sorted = [...filtered].sort((a, b) => b.rating - a.rating);

  if (sorted.length === 0) {
    container.innerHTML = '<p class="no-data">해당 카테고리의 맛집 정보가 아직 없습니다.</p>';
    return;
  }

  container.innerHTML = sorted.map(rest => `
    <div class="restaurant-card">
      <img src="${rest.image}" alt="${rest.name}" class="card-img" loading="lazy">
      <div class="card-content">
        <div class="card-header">
          <a href="#" class="restaurant-name">${rest.name}</a>
          <span class="card-meta">${rest.area} &bull; ${rest.category}</span>
        </div>
        <div class="rating-area">
          <span class="score">${rest.rating}</span>
          <span class="stars">${getStarRatingHTML(rest.rating)}</span>
          <span class="review-count">(${rest.reviews} reviews)</span>
        </div>
        <div class="card-info">
          <span class="price-range">💰 ${rest.price}</span>
          <p>${rest.description}</p>
        </div>
      </div>
    </div>
  `).join('');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Initial Page Load
  navigateTo('home');

  // Navigation Links
  document.addEventListener('click', (e) => {
    const pageLink = e.target.closest('[data-page]');
    if (pageLink) {
      e.preventDefault();
      navigateTo(pageLink.getAttribute('data-page'));
    }

    const catLink = e.target.closest('[data-cat]');
    if (catLink) {
      e.preventDefault();
      document.querySelectorAll('[data-cat]').forEach(l => l.classList.remove('active'));
      catLink.classList.add('active');
      navigateTo('home', catLink.getAttribute('data-cat'));
    }
  });

  // Search Logic
  document.getElementById('search-btn').addEventListener('click', () => {
    const area = document.getElementById('area-select').value;
    const keyword = document.getElementById('search-input').value.toLowerCase();
    
    // Simulate searching
    alert(`검색 결과: ${area} 지역의 '${keyword}' 관련 맛집을 찾고 있습니다.\n(실제 검색은 백엔드 연동 시 활성화됩니다.)`);
  });
});
