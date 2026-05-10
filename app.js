const APP_VERSION = "trip-municipality-v2";
const STORAGE_KEY = "trip-municipality-records-v2";

const statuses = [
  { id: "none", label: "未訪問", color: "#edf1ed", score: 0 },
  { id: "passed", label: "通過した", color: "#9bd0e5", score: 1 },
  { id: "transfer", label: "乗り換えた", color: "#70b7a8", score: 2 },
  { id: "landed", label: "降りた", color: "#f1c36b", score: 3 },
  { id: "visited", label: "観光した", color: "#e77b5f", score: 4 },
  { id: "stayed", label: "宿泊した", color: "#7b61a8", score: 5 },
  { id: "lived", label: "住んだ", color: "#1f3b35", score: 6 }
];

const prefectures = [
  { name: "北海道", region: "北海道", total: 179 },
  { name: "青森県", region: "東北", total: 40 },
  { name: "岩手県", region: "東北", total: 33 },
  { name: "宮城県", region: "東北", total: 35 },
  { name: "秋田県", region: "東北", total: 25 },
  { name: "山形県", region: "東北", total: 35 },
  { name: "福島県", region: "東北", total: 59 },
  { name: "茨城県", region: "関東", total: 44 },
  { name: "栃木県", region: "関東", total: 25 },
  { name: "群馬県", region: "関東", total: 35 },
  { name: "埼玉県", region: "関東", total: 63 },
  { name: "千葉県", region: "関東", total: 54 },
  { name: "東京都", region: "関東", total: 62 },
  { name: "神奈川県", region: "関東", total: 33 },
  { name: "新潟県", region: "中部", total: 30 },
  { name: "富山県", region: "中部", total: 15 },
  { name: "石川県", region: "中部", total: 19 },
  { name: "福井県", region: "中部", total: 17 },
  { name: "山梨県", region: "中部", total: 27 },
  { name: "長野県", region: "中部", total: 77 },
  { name: "岐阜県", region: "中部", total: 42 },
  { name: "静岡県", region: "中部", total: 35 },
  { name: "愛知県", region: "中部", total: 54 },
  { name: "三重県", region: "近畿", total: 29 },
  { name: "滋賀県", region: "近畿", total: 19 },
  { name: "京都府", region: "近畿", total: 26 },
  { name: "大阪府", region: "近畿", total: 43 },
  { name: "兵庫県", region: "近畿", total: 41 },
  { name: "奈良県", region: "近畿", total: 39 },
  { name: "和歌山県", region: "近畿", total: 30 },
  { name: "鳥取県", region: "中国", total: 19 },
  { name: "島根県", region: "中国", total: 19 },
  { name: "岡山県", region: "中国", total: 27 },
  { name: "広島県", region: "中国", total: 23 },
  { name: "山口県", region: "中国", total: 19 },
  { name: "徳島県", region: "四国", total: 24 },
  { name: "香川県", region: "四国", total: 17 },
  { name: "愛媛県", region: "四国", total: 20 },
  { name: "高知県", region: "四国", total: 34 },
  { name: "福岡県", region: "九州", total: 60 },
  { name: "佐賀県", region: "九州", total: 20 },
  { name: "長崎県", region: "九州", total: 21 },
  { name: "熊本県", region: "九州", total: 45 },
  { name: "大分県", region: "九州", total: 18 },
  { name: "宮崎県", region: "九州", total: 26 },
  { name: "鹿児島県", region: "九州", total: 43 },
  { name: "沖縄県", region: "九州", total: 41 }
];

const sampleMunicipalities = {
  北海道: ["札幌市", "函館市", "小樽市", "旭川市", "帯広市", "釧路市", "北見市", "稚内市"],
  青森県: ["青森市", "弘前市", "八戸市", "五所川原市", "十和田市"],
  岩手県: ["盛岡市", "花巻市", "一関市", "宮古市", "釜石市"],
  宮城県: ["仙台市", "石巻市", "塩竈市", "白石市", "大崎市"],
  秋田県: ["秋田市", "横手市", "大館市", "大仙市", "由利本荘市"],
  山形県: ["山形市", "米沢市", "鶴岡市", "酒田市", "天童市"],
  福島県: ["福島市", "会津若松市", "郡山市", "いわき市", "白河市"],
  茨城県: ["水戸市", "土浦市", "つくば市", "取手市", "日立市"],
  栃木県: ["宇都宮市", "足利市", "栃木市", "小山市", "日光市"],
  群馬県: ["前橋市", "高崎市", "桐生市", "伊勢崎市", "草津町"],
  埼玉県: ["さいたま市", "川越市", "熊谷市", "秩父市", "越谷市"],
  千葉県: ["千葉市", "銚子市", "市川市", "船橋市", "柏市", "松戸市"],
  東京都: ["千代田区", "中央区", "港区", "新宿区", "台東区", "北区", "八王子市", "町田市"],
  神奈川県: ["横浜市", "川崎市", "相模原市", "鎌倉市", "小田原市", "箱根町"],
  新潟県: ["新潟市", "長岡市", "上越市", "佐渡市", "湯沢町"],
  富山県: ["富山市", "高岡市", "魚津市", "黒部市", "砺波市"],
  石川県: ["金沢市", "七尾市", "小松市", "加賀市", "輪島市"],
  福井県: ["福井市", "敦賀市", "小浜市", "越前市", "坂井市"],
  山梨県: ["甲府市", "富士吉田市", "都留市", "山梨市", "北杜市"],
  長野県: ["長野市", "松本市", "上田市", "飯田市", "軽井沢町"],
  岐阜県: ["岐阜市", "大垣市", "高山市", "多治見市", "下呂市"],
  静岡県: ["静岡市", "浜松市", "沼津市", "熱海市", "伊東市"],
  愛知県: ["名古屋市", "豊橋市", "岡崎市", "一宮市", "豊田市"],
  三重県: ["津市", "四日市市", "伊勢市", "松阪市", "鳥羽市"],
  滋賀県: ["大津市", "彦根市", "長浜市", "近江八幡市", "草津市"],
  京都府: ["京都市", "宇治市", "舞鶴市", "福知山市", "宮津市"],
  大阪府: ["大阪市", "堺市", "岸和田市", "豊中市", "吹田市"],
  兵庫県: ["神戸市", "姫路市", "尼崎市", "明石市", "豊岡市"],
  奈良県: ["奈良市", "大和郡山市", "天理市", "橿原市", "吉野町"],
  和歌山県: ["和歌山市", "海南市", "田辺市", "新宮市", "白浜町"],
  鳥取県: ["鳥取市", "米子市", "倉吉市", "境港市", "大山町"],
  島根県: ["松江市", "浜田市", "出雲市", "益田市", "津和野町"],
  岡山県: ["岡山市", "倉敷市", "津山市", "玉野市", "備前市"],
  広島県: ["広島市", "呉市", "尾道市", "福山市", "廿日市市"],
  山口県: ["下関市", "宇部市", "山口市", "萩市", "岩国市"],
  徳島県: ["徳島市", "鳴門市", "阿南市", "美馬市", "三好市"],
  香川県: ["高松市", "丸亀市", "坂出市", "観音寺市", "小豆島町"],
  愛媛県: ["松山市", "今治市", "宇和島市", "新居浜市", "大洲市"],
  高知県: ["高知市", "室戸市", "安芸市", "四万十市", "土佐清水市"],
  福岡県: ["福岡市", "北九州市", "久留米市", "飯塚市", "太宰府市"],
  佐賀県: ["佐賀市", "唐津市", "鳥栖市", "伊万里市", "嬉野市"],
  長崎県: ["長崎市", "佐世保市", "島原市", "諫早市", "五島市"],
  熊本県: ["熊本市", "八代市", "人吉市", "阿蘇市", "天草市"],
  大分県: ["大分市", "別府市", "中津市", "日田市", "由布市"],
  宮崎県: ["宮崎市", "都城市", "延岡市", "日南市", "高千穂町"],
  鹿児島県: ["鹿児島市", "鹿屋市", "霧島市", "指宿市", "奄美市"],
  沖縄県: ["那覇市", "石垣市", "浦添市", "名護市", "宮古島市"]
};

const routePresets = [
  {
    id: "tohoku-shinkansen",
    name: "東北新幹線 東京 → 仙台",
    line: "東北新幹線",
    cities: [["東京都", "千代田区"], ["東京都", "台東区"], ["東京都", "北区"], ["埼玉県", "さいたま市"], ["埼玉県", "熊谷市"], ["栃木県", "小山市"], ["栃木県", "宇都宮市"], ["福島県", "郡山市"], ["福島県", "福島市"], ["宮城県", "仙台市"]]
  },
  {
    id: "tokaido-shinkansen",
    name: "東海道新幹線 東京 → 新大阪",
    line: "東海道新幹線",
    cities: [["東京都", "千代田区"], ["神奈川県", "横浜市"], ["神奈川県", "小田原市"], ["静岡県", "熱海市"], ["静岡県", "静岡市"], ["愛知県", "名古屋市"], ["京都府", "京都市"], ["大阪府", "大阪市"]]
  },
  {
    id: "joban-line",
    name: "常磐線 上野 → 水戸",
    line: "常磐線",
    cities: [["東京都", "台東区"], ["千葉県", "松戸市"], ["千葉県", "柏市"], ["茨城県", "取手市"], ["茨城県", "土浦市"], ["茨城県", "水戸市"]]
  },
  {
    id: "hokuriku-shinkansen",
    name: "北陸新幹線 東京 → 金沢",
    line: "北陸新幹線",
    cities: [["東京都", "千代田区"], ["埼玉県", "さいたま市"], ["埼玉県", "熊谷市"], ["長野県", "長野市"], ["富山県", "富山市"], ["石川県", "金沢市"]]
  }
];

let state = loadState();
let selectedPref = state.selectedPref || "東京都";
let regionFilter = "すべて";
let onlyRemaining = false;
let editingCityId = null;

const byId = (id) => document.getElementById(id);
const cityId = (pref, name) => `${pref}::${name}`;
const allRegions = ["すべて", ...Array.from(new Set(prefectures.map((pref) => pref.region)))];

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { records: {}, trips: [], rides: [], customCities: {} };
  } catch {
    return { records: {}, trips: [], rides: [], customCities: {} };
  }
}

function saveState() {
  state.selectedPref = selectedPref;
  state.records ||= {};
  state.trips ||= [];
  state.rides ||= [];
  state.customCities ||= {};
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function statusById(id) {
  return statuses.find((status) => status.id === id) || statuses[0];
}

function ensureCity(prefName, name) {
  state.customCities ||= {};
  state.customCities[prefName] ||= [];
  if (!citiesForPref(prefName).some((city) => city.name === name)) {
    state.customCities[prefName].push(name);
  }
}

function citiesForPref(prefName) {
  const custom = state.customCities?.[prefName] || [];
  const names = Array.from(new Set([...(sampleMunicipalities[prefName] || []), ...custom]));
  return names.map((name) => ({ id: cityId(prefName, name), pref: prefName, name }));
}

function recordFor(id) {
  return state.records?.[id] || { status: "none", memo: "", date: "", tags: "", revisit: "" };
}

function recordedCities(prefName) {
  return citiesForPref(prefName).filter((city) => recordFor(city.id).status !== "none");
}

function scoreForRecord(record) {
  return statusById(record.status).score;
}

function bestPrefStatus(prefName) {
  const records = recordedCities(prefName).map((city) => recordFor(city.id));
  return records.sort((a, b) => scoreForRecord(b) - scoreForRecord(a))[0] || { status: "none" };
}

function prefRatio(prefName) {
  const pref = prefectures.find((item) => item.name === prefName);
  const denominator = pref?.total || citiesForPref(prefName).length;
  return Math.round((recordedCities(prefName).length / denominator) * 100);
}

function renderBaseOptions() {
  byId("regionFilter").innerHTML = allRegions.map((region) => `<option value="${region}">${region}</option>`).join("");
  byId("prefSelect").innerHTML = prefectures.map((pref) => `<option value="${pref.name}">${pref.name}</option>`).join("");
  byId("prefSelect").value = selectedPref;
  byId("statusSelect").innerHTML = statuses.map((status) => `<option value="${status.id}">${status.label}</option>`).join("");
  byId("railStatusSelect").innerHTML = statuses
    .filter((status) => ["passed", "transfer", "landed"].includes(status.id))
    .map((status) => `<option value="${status.id}">${status.label}</option>`)
    .join("");
  byId("routeSelect").innerHTML = routePresets.map((route) => `<option value="${route.id}">${route.name}</option>`).join("");
  byId("legend").innerHTML = statuses
    .map((status) => `<span><i style="background:${status.color}"></i>${status.label}</span>`)
    .join("");
}

function renderSummary() {
  const records = Object.values(state.records || {}).filter((record) => record.status !== "none");
  byId("totalScore").textContent = records.reduce((sum, record) => sum + scoreForRecord(record), 0);
  byId("recordedCount").textContent = records.length;
  byId("railCount").textContent = records.filter((record) => ["passed", "transfer"].includes(record.status)).length;
  byId("tripCount").textContent = (state.trips || []).length;
}

function renderPrefs() {
  const prefs = prefectures.filter((pref) => regionFilter === "すべて" || pref.region === regionFilter);
  byId("prefGrid").innerHTML = prefs
    .map((pref) => {
      const status = statusById(bestPrefStatus(pref.name).status);
      const count = recordedCities(pref.name).length;
      const ratio = prefRatio(pref.name);
      return `<button class="pref-card" type="button" data-pref="${pref.name}" style="background:${status.color}">
        <strong>${pref.name}</strong>
        <small>${count} / ${pref.total} 市区町村</small>
        <div class="progress"><span style="width:${Math.min(ratio, 100)}%"></span></div>
      </button>`;
    })
    .join("");
}

function renderCities() {
  const cities = citiesForPref(selectedPref);
  const pref = prefectures.find((item) => item.name === selectedPref);
  byId("cityTitle").textContent = selectedPref;
  byId("cityHint").textContent = `${recordedCities(selectedPref).length} / ${pref?.total || cities.length} 市区町村を登録済み`;
  byId("prefSelect").value = selectedPref;
  byId("cityGrid").innerHTML = cities
    .map((city) => {
      const record = recordFor(city.id);
      const status = statusById(record.status);
      const meta = [record.date, record.tags, record.revisit ? `また行きたい ${record.revisit}` : ""].filter(Boolean).join(" ・ ");
      return `<button class="city-card" type="button" data-city-id="${city.id}" style="border-color:${status.color}">
        <header>
          <strong>${city.name}</strong>
          <span class="status-pill" style="background:${status.color}">${status.label}</span>
        </header>
        <p>${escapeHtml(record.memo || meta || "タップして記録")}</p>
      </button>`;
    })
    .join("");
}

function renderRail() {
  const route = routePresets.find((item) => item.id === byId("routeSelect").value) || routePresets[0];
  byId("routePreview").innerHTML = route.cities
    .map(([pref, name], index) => {
      const record = recordFor(cityId(pref, name));
      return `<div class="mini-card">
        <strong>${index + 1}. ${pref} ${name}</strong>
        <small>現在: ${statusById(record.status).label}</small>
      </div>`;
    })
    .join("");

  const rides = state.rides || [];
  byId("rideLog").innerHTML = rides.length
    ? rides
        .slice()
        .reverse()
        .map((ride) => {
          const tags = tagsHtml([ride.statusLabel, `${ride.cityCount}市区町村`].join(","));
          return `<article class="mini-card">
            <strong>${escapeHtml(ride.routeName)}</strong>
            <small>${ride.date}</small>
            ${tags}
          </article>`;
        })
        .join("")
    : `<article class="mini-card"><strong>乗車ログはまだありません</strong><p>鉄路登録を使うとここに残ります。</p></article>`;
}

function renderTrips() {
  const trips = state.trips || [];
  byId("tripList").innerHTML = trips.length
    ? trips
        .slice()
        .reverse()
        .map((trip) => `<article class="mini-card">
          <strong>${escapeHtml(trip.title)}</strong>
          <small>${trip.date || "日付なし"}</small>
          <p>${escapeHtml(trip.memo || "メモなし")}</p>
          ${tagsHtml(trip.tags)}
        </article>`)
        .join("")
    : `<article class="mini-card"><strong>旅行メモはまだありません</strong><p>旅行ごとに訪問市区町村や乗った路線をまとめられます。</p></article>`;
}

function renderStats() {
  const rows = prefectures
    .map((pref) => ({ ...pref, count: recordedCities(pref.name).length, ratio: prefRatio(pref.name) }))
    .filter((pref) => !onlyRemaining || pref.count === 0);

  byId("onlyRemainingButton").textContent = onlyRemaining ? "すべて表示" : "未訪問だけ";
  byId("statsList").innerHTML = rows
    .map((pref) => `<div class="stat-row">
      <strong>${pref.name}</strong>
      <div class="progress"><span style="width:${Math.min(pref.ratio, 100)}%"></span></div>
      <small>${pref.count}/${pref.total}</small>
    </div>`)
    .join("");

  const suggestions = prefectures
    .map((pref) => {
      const cities = citiesForPref(pref.name);
      const unvisited = cities.filter((city) => recordFor(city.id).status === "none");
      return { pref, remaining: unvisited.length, next: unvisited[0], count: recordedCities(pref.name).length };
    })
    .filter((item) => item.count > 0 && item.remaining > 0 && item.remaining <= 2)
    .slice(0, 5);

  byId("suggestions").innerHTML = suggestions.length
    ? suggestions
        .map((item) => `<article class="mini-card">
          <strong>${item.pref.name} あと${item.remaining}件</strong>
          <p>次は${item.next.name}を埋めるとサンプル収録分を制覇できます。</p>
        </article>`)
        .join("")
    : `<article class="mini-card"><strong>鉄路登録から始めるのがおすすめ</strong><p>新幹線や常磐線の通過市区町村をまとめて登録すると、提案が出やすくなります。</p></article>`;
}

function renderAll() {
  renderSummary();
  renderPrefs();
  renderCities();
  renderRail();
  renderTrips();
  renderStats();
}

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((screen) => screen.classList.toggle("active", screen.id === screenId));
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.screen === screenId);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openEditor(id) {
  editingCityId = id;
  const [pref, name] = id.split("::");
  const record = recordFor(id);
  byId("editorPref").textContent = pref;
  byId("editorCity").textContent = name;
  byId("statusSelect").value = record.status;
  byId("visitDate").value = record.date || "";
  byId("cityTags").value = record.tags || "";
  byId("revisitSelect").value = record.revisit || "";
  byId("memoInput").value = record.memo || "";
  byId("editorDialog").showModal();
}

function applyCityStatus(pref, name, statusId, note) {
  ensureCity(pref, name);
  const id = cityId(pref, name);
  const current = statusById(recordFor(id).status);
  const incoming = statusById(statusId);
  if (incoming.score < current.score) return;
  state.records[id] = {
    ...recordFor(id),
    status: incoming.id,
    memo: note || recordFor(id).memo,
    date: recordFor(id).date || new Date().toISOString().slice(0, 10)
  };
}

function exportJson() {
  const payload = { app: APP_VERSION, exportedAt: new Date().toISOString(), state };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `trip-municipality-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function importJson(file) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const payload = JSON.parse(reader.result);
      state = payload.state?.records ? payload.state : payload;
      state.records ||= {};
      state.trips ||= [];
      state.rides ||= [];
      state.customCities ||= {};
      selectedPref = state.selectedPref || selectedPref;
      saveState();
      renderAll();
      showScreen("prefScreen");
    } catch {
      alert("読み込めないJSONです。");
    }
  });
  reader.readAsText(file);
}

function tagsHtml(value) {
  const tags = String(value || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  if (!tags.length) return "";
  return `<div class="tag-row">${tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return map[char];
  });
}

document.addEventListener("click", (event) => {
  const nav = event.target.closest(".nav-button");
  if (nav) showScreen(nav.dataset.screen);

  const pref = event.target.closest(".pref-card");
  if (pref) {
    selectedPref = pref.dataset.pref;
    saveState();
    renderCities();
    showScreen("cityScreen");
  }

  const city = event.target.closest(".city-card");
  if (city) openEditor(city.dataset.cityId);
});

byId("regionFilter").addEventListener("change", (event) => {
  regionFilter = event.target.value;
  renderPrefs();
});

byId("prefSelect").addEventListener("change", (event) => {
  selectedPref = event.target.value;
  saveState();
  renderCities();
});

byId("addCityForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = byId("addCityInput");
  const name = input.value.trim();
  if (!name) return;
  ensureCity(selectedPref, name);
  input.value = "";
  saveState();
  renderAll();
});

byId("routeSelect").addEventListener("change", renderRail);

byId("railForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const route = routePresets.find((item) => item.id === byId("routeSelect").value);
  const status = byId("railStatusSelect").value;
  route.cities.forEach(([pref, name]) => applyCityStatus(pref, name, status, `${route.line}で通過`));
  state.rides.push({
    id: crypto.randomUUID(),
    routeName: route.name,
    status,
    statusLabel: statusById(status).label,
    cityCount: route.cities.length,
    date: new Date().toISOString().slice(0, 10)
  });
  saveState();
  renderAll();
});

byId("tripForm").addEventListener("submit", (event) => {
  event.preventDefault();
  state.trips.push({
    id: crypto.randomUUID(),
    title: byId("tripTitle").value.trim(),
    date: byId("tripDate").value,
    tags: byId("tripTags").value.trim(),
    memo: byId("tripMemo").value.trim()
  });
  byId("tripForm").reset();
  saveState();
  renderAll();
});

byId("editorForm").addEventListener("submit", (event) => {
  if (event.submitter?.value !== "save") return;
  event.preventDefault();
  state.records[editingCityId] = {
    status: byId("statusSelect").value,
    date: byId("visitDate").value,
    tags: byId("cityTags").value.trim(),
    revisit: byId("revisitSelect").value,
    memo: byId("memoInput").value.trim()
  };
  if (state.records[editingCityId].status === "none") delete state.records[editingCityId];
  saveState();
  byId("editorDialog").close();
  renderAll();
});

byId("clearCityButton").addEventListener("click", () => {
  delete state.records[editingCityId];
  saveState();
  byId("editorDialog").close();
  renderAll();
});

byId("onlyRemainingButton").addEventListener("click", () => {
  onlyRemaining = !onlyRemaining;
  renderStats();
});

byId("exportButton").addEventListener("click", exportJson);
byId("backupButton").addEventListener("click", exportJson);
byId("importInput").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) importJson(file);
  event.target.value = "";
});

byId("resetButton").addEventListener("click", () => {
  if (!confirm("このスマホの記録をすべて削除します。よろしいですか？")) return;
  state = { records: {}, trips: [], rides: [], customCities: {} };
  saveState();
  renderAll();
  showScreen("prefScreen");
});

renderBaseOptions();
saveState();
renderAll();

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("./sw.js?v=2").catch(() => {});
}
