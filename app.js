const APP_VERSION = "trip-municipality-v3";
const STORAGE_KEY = "trip-municipality-records-v3";

const data = window.MUNICIPALITY_DATA;

const statuses = [
  { id: "none", label: "未訪問", color: "#eef2ef", score: 0 },
  { id: "passed", label: "通過した", color: "#9bd0e5", score: 1 },
  { id: "transfer", label: "乗り換えた", color: "#70b7a8", score: 2 },
  { id: "landed", label: "降りた", color: "#f1c36b", score: 3 },
  { id: "visited", label: "観光した", color: "#e77b5f", score: 4 },
  { id: "stayed", label: "宿泊した", color: "#7b61a8", score: 5 },
  { id: "lived", label: "住んだ", color: "#1f3b35", score: 6 }
];

const tilePositions = {
  北海道: [11, 1],
  青森県: [10, 3], 岩手県: [11, 4], 宮城県: [11, 5], 秋田県: [10, 4], 山形県: [10, 5], 福島県: [10, 6],
  茨城県: [10, 7], 栃木県: [9, 7], 群馬県: [8, 7], 埼玉県: [9, 8], 千葉県: [11, 9], 東京都: [10, 9], 神奈川県: [9, 10],
  新潟県: [8, 6], 富山県: [7, 7], 石川県: [6, 7], 福井県: [5, 8], 山梨県: [8, 9], 長野県: [8, 8], 岐阜県: [6, 9], 静岡県: [8, 10], 愛知県: [7, 10],
  三重県: [6, 10], 滋賀県: [5, 9], 京都府: [4, 9], 大阪府: [4, 10], 兵庫県: [3, 9], 奈良県: [5, 10], 和歌山県: [5, 11],
  鳥取県: [2, 8], 島根県: [1, 8], 岡山県: [2, 9], 広島県: [1, 9], 山口県: [0, 9],
  徳島県: [3, 11], 香川県: [3, 10], 愛媛県: [2, 11], 高知県: [2, 12],
  福岡県: [0, 10], 佐賀県: [0, 11], 長崎県: [0, 12], 熊本県: [1, 12], 大分県: [1, 11], 宮崎県: [1, 13], 鹿児島県: [0, 13], 沖縄県: [0, 15]
};

const routePresets = [
  {
    id: "hokkaido-hakodate-sapporo",
    area: "北海道",
    name: "函館本線系統 函館 → 札幌",
    line: "函館本線",
    stops: [
      ["北海道", "函館市"], ["北海道", "北斗市"], ["北海道", "七飯町"], ["北海道", "森町"],
      ["北海道", "八雲町"], ["北海道", "長万部町"], ["北海道", "倶知安町"], ["北海道", "余市町"],
      ["北海道", "小樽市"], ["北海道", "札幌市"]
    ]
  },
  {
    id: "hokkaido-chitose-muroran",
    area: "北海道",
    name: "千歳線・室蘭本線 札幌 → 室蘭",
    line: "千歳線・室蘭本線",
    stops: [
      ["北海道", "札幌市"], ["北海道", "北広島市"], ["北海道", "恵庭市"], ["北海道", "千歳市"],
      ["北海道", "苫小牧市"], ["北海道", "白老町"], ["北海道", "登別市"], ["北海道", "室蘭市"]
    ]
  },
  {
    id: "hokkaido-tokachi-kushiro",
    area: "北海道",
    name: "石勝線・根室本線 札幌 → 釧路",
    line: "石勝線・根室本線",
    stops: [
      ["北海道", "札幌市"], ["北海道", "千歳市"], ["北海道", "安平町"], ["北海道", "むかわ町"],
      ["北海道", "占冠村"], ["北海道", "南富良野町"], ["北海道", "新得町"], ["北海道", "清水町"],
      ["北海道", "芽室町"], ["北海道", "帯広市"], ["北海道", "幕別町"], ["北海道", "池田町"],
      ["北海道", "浦幌町"], ["北海道", "白糠町"], ["北海道", "釧路市"]
    ]
  },
  {
    id: "hokkaido-soya",
    area: "北海道",
    name: "宗谷本線 旭川 → 稚内",
    line: "宗谷本線",
    stops: [
      ["北海道", "旭川市"], ["北海道", "比布町"], ["北海道", "和寒町"], ["北海道", "剣淵町"],
      ["北海道", "士別市"], ["北海道", "名寄市"], ["北海道", "美深町"], ["北海道", "音威子府村"],
      ["北海道", "中川町"], ["北海道", "幌延町"], ["北海道", "豊富町"], ["北海道", "稚内市"]
    ]
  },
  {
    id: "kanto-yamanote",
    area: "関東",
    name: "山手線 一周",
    line: "山手線",
    stops: [
      ["東京都", "千代田区"], ["東京都", "港区"], ["東京都", "品川区"], ["東京都", "渋谷区"],
      ["東京都", "新宿区"], ["東京都", "豊島区"], ["東京都", "北区"], ["東京都", "荒川区"],
      ["東京都", "台東区"], ["東京都", "千代田区"]
    ]
  },
  {
    id: "kanto-joban",
    area: "関東",
    name: "常磐線 上野 → 水戸 → いわき",
    line: "常磐線",
    stops: [
      ["東京都", "台東区"], ["東京都", "荒川区"], ["東京都", "足立区"], ["千葉県", "松戸市"],
      ["千葉県", "柏市"], ["千葉県", "我孫子市"], ["茨城県", "取手市"], ["茨城県", "龍ケ崎市"],
      ["茨城県", "牛久市"], ["茨城県", "土浦市"], ["茨城県", "石岡市"], ["茨城県", "水戸市"],
      ["茨城県", "日立市"], ["茨城県", "高萩市"], ["茨城県", "北茨城市"], ["福島県", "いわき市"]
    ]
  },
  {
    id: "kanto-tohoku-shinkansen",
    area: "関東",
    name: "東北新幹線 東京 → 仙台",
    line: "東北新幹線",
    stops: [
      ["東京都", "千代田区"], ["東京都", "台東区"], ["東京都", "荒川区"], ["東京都", "北区"],
      ["埼玉県", "さいたま市"], ["埼玉県", "久喜市"], ["栃木県", "小山市"], ["栃木県", "宇都宮市"],
      ["栃木県", "那須塩原市"], ["福島県", "白河市"], ["福島県", "郡山市"], ["福島県", "福島市"],
      ["宮城県", "白石市"], ["宮城県", "仙台市"]
    ]
  },
  {
    id: "kanto-tokaido-shinkansen",
    area: "関東",
    name: "東海道新幹線 東京 → 新大阪",
    line: "東海道新幹線",
    stops: [
      ["東京都", "千代田区"], ["東京都", "港区"], ["東京都", "品川区"], ["神奈川県", "横浜市"],
      ["神奈川県", "小田原市"], ["静岡県", "熱海市"], ["静岡県", "三島市"], ["静岡県", "静岡市"],
      ["静岡県", "浜松市"], ["愛知県", "豊橋市"], ["愛知県", "名古屋市"], ["京都府", "京都市"],
      ["大阪府", "大阪市"]
    ]
  },
  {
    id: "kanto-takasaki",
    area: "関東",
    name: "高崎線 東京 → 高崎",
    line: "高崎線",
    stops: [
      ["東京都", "千代田区"], ["東京都", "台東区"], ["東京都", "荒川区"], ["東京都", "北区"],
      ["埼玉県", "さいたま市"], ["埼玉県", "上尾市"], ["埼玉県", "桶川市"], ["埼玉県", "北本市"],
      ["埼玉県", "鴻巣市"], ["埼玉県", "熊谷市"], ["埼玉県", "深谷市"], ["群馬県", "高崎市"]
    ]
  },
  {
    id: "kanto-sobu",
    area: "関東",
    name: "総武本線 東京 → 銚子",
    line: "総武本線",
    stops: [
      ["東京都", "千代田区"], ["東京都", "中央区"], ["東京都", "江東区"], ["東京都", "墨田区"],
      ["東京都", "江戸川区"], ["千葉県", "市川市"], ["千葉県", "船橋市"], ["千葉県", "千葉市"],
      ["千葉県", "佐倉市"], ["千葉県", "成田市"], ["千葉県", "香取市"], ["千葉県", "銚子市"]
    ]
  },
  {
    id: "kanto-chuo",
    area: "関東",
    name: "中央本線 東京 → 甲府",
    line: "中央本線",
    stops: [
      ["東京都", "千代田区"], ["東京都", "新宿区"], ["東京都", "中野区"], ["東京都", "杉並区"],
      ["東京都", "武蔵野市"], ["東京都", "三鷹市"], ["東京都", "国分寺市"], ["東京都", "立川市"],
      ["東京都", "八王子市"], ["神奈川県", "相模原市"], ["山梨県", "上野原市"], ["山梨県", "大月市"],
      ["山梨県", "甲州市"], ["山梨県", "甲府市"]
    ]
  }
];

let state = loadState();
let selectedPref = state.selectedPref || "東京都";
let regionFilter = "すべて";
let citySearch = "";
let onlyRemaining = false;
let editingCityId = null;
let manualRailStops = [];

const byId = (id) => document.getElementById(id);
const cityId = (pref, name) => `${pref}::${name}`;
const prefectures = data.prefectures;
const allRegions = ["すべて", ...Array.from(new Set(prefectures.map((pref) => pref.region)))];

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { records: {}, trips: [], rides: [] };
  } catch {
    return { records: {}, trips: [], rides: [] };
  }
}

function saveState() {
  state.selectedPref = selectedPref;
  state.records ||= {};
  state.trips ||= [];
  state.rides ||= [];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function statusById(id) {
  return statuses.find((status) => status.id === id) || statuses[0];
}

function citiesForPref(prefName) {
  return (data.municipalities[prefName] || []).map((city) => {
    const name = typeof city === "string" ? city : city.name;
    const code = typeof city === "string" ? "" : city.code;
    return {
    id: cityId(prefName, name),
    code,
    pref: prefName,
    name
    };
  });
}

function municipalityExists(pref, name) {
  return citiesForPref(pref).some((city) => city.name === name);
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
  const denominator = pref?.total || citiesForPref(prefName).length || 1;
  return Math.round((recordedCities(prefName).length / denominator) * 100);
}

function routeSegment(route) {
  const fromIndex = Number(byId("railFromSelect").value || 0);
  const toIndex = Number(byId("railToSelect").value || route.stops.length - 1);
  const start = Math.min(fromIndex, toIndex);
  const end = Math.max(fromIndex, toIndex);
  const segment = route.stops.slice(start, end + 1);
  return fromIndex <= toIndex ? segment : segment.reverse();
}

function uniqueStops(stops) {
  const seen = new Set();
  return stops.filter(([pref, name]) => {
    const key = cityId(pref, name);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function renderBaseOptions() {
  byId("regionFilter").innerHTML = allRegions.map((region) => `<option value="${region}">${region}</option>`).join("");
  byId("prefSelect").innerHTML = prefectures.map((pref) => `<option value="${pref.name}">${pref.name}</option>`).join("");
  byId("prefSelect").value = selectedPref;
  byId("railAddPrefSelect").innerHTML = prefectures.map((pref) => `<option value="${pref.name}">${pref.name}</option>`).join("");
  byId("railAddPrefSelect").value = selectedPref;
  byId("statusSelect").innerHTML = statuses.map((status) => `<option value="${status.id}">${status.label}</option>`).join("");
  byId("railStatusSelect").innerHTML = statuses
    .filter((status) => ["passed", "transfer", "landed"].includes(status.id))
    .map((status) => `<option value="${status.id}">${status.label}</option>`)
    .join("");
  byId("routeSelect").innerHTML = routePresets.map((route) => `<option value="${route.id}">${route.area} / ${route.name}</option>`).join("");
  byId("legend").innerHTML = statuses
    .map((status) => `<span><i style="background:${status.color}"></i>${status.label}</span>`)
    .join("");
  renderRouteOptions();
  renderRailCityDatalist();
}

function renderSummary() {
  const records = Object.values(state.records || {}).filter((record) => record.status !== "none");
  byId("totalScore").textContent = records.reduce((sum, record) => sum + scoreForRecord(record), 0);
  byId("recordedCount").textContent = records.length;
  byId("railCount").textContent = records.filter((record) => record.source === "rail" || ["passed", "transfer"].includes(record.status)).length;
  byId("tripCount").textContent = (state.trips || []).length;
}

function renderPrefTileMap() {
  if (!byId("prefTileMap")) return;
  const prefs = prefectures.filter((pref) => regionFilter === "すべて" || pref.region === regionFilter);
  byId("prefTileMap").innerHTML = prefs
    .map((pref) => {
      const status = statusById(bestPrefStatus(pref.name).status);
      const [x, y] = tilePositions[pref.name] || [0, 0];
      return `<button class="map-tile" type="button" data-pref="${pref.name}" style="--x:${x}; --y:${y}; background:${status.color}">
        <span>${pref.name.replace(/[都道府県]/g, "")}</span>
      </button>`;
    })
    .join("");
}

function renderPrefs() {
  const prefs = prefectures.filter((pref) => regionFilter === "すべて" || pref.region === regionFilter);
  renderPrefTileMap();
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
  const allCities = citiesForPref(selectedPref);
  const cities = citySearch
    ? allCities.filter((city) => city.name.includes(citySearch) || city.code.includes(citySearch))
    : allCities;
  const pref = prefectures.find((item) => item.name === selectedPref);
  byId("cityTitle").textContent = selectedPref;
  byId("cityHint").textContent = `${recordedCities(selectedPref).length} / ${pref?.total || allCities.length} 市区町村を登録済み`;
  byId("prefSelect").value = selectedPref;
  byId("cityGrid").innerHTML = cities
    .map((city) => {
      const record = recordFor(city.id);
      const status = statusById(record.status);
      const meta = [record.date, record.tags, record.revisit ? `また行きたい ${record.revisit}` : ""].filter(Boolean).join(" ・ ");
      return `<button class="city-card" type="button" data-city-id="${city.id}" style="--status:${status.color}">
        <header>
          <strong>${city.name}</strong>
          <span class="status-pill" style="background:${status.color}">${status.label}</span>
        </header>
        <p>${escapeHtml(record.memo || meta || `${city.code ? `${city.code} / ` : ""}タップして記録`)}</p>
      </button>`;
    })
    .join("");
}

function renderRouteOptions() {
  manualRailStops = [];
  const route = routePresets.find((item) => item.id === byId("routeSelect").value) || routePresets[0];
  const options = route.stops
    .map(([pref, name], index) => `<option value="${index}">${index + 1}. ${name}（${pref}）</option>`)
    .join("");
  byId("railFromSelect").innerHTML = options;
  byId("railToSelect").innerHTML = options;
  byId("railToSelect").value = String(route.stops.length - 1);
  renderRail();
}

function renderRail() {
  const route = routePresets.find((item) => item.id === byId("routeSelect").value) || routePresets[0];
  const segment = uniqueStops([...routeSegment(route), ...manualRailStops]);
  byId("routePreview").innerHTML = segment
    .map(([pref, name], index) => {
      const id = cityId(pref, name);
      const record = recordFor(id);
      const exists = municipalityExists(pref, name);
      return `<label class="check-card ${exists ? "" : "missing"}">
        <input type="checkbox" class="rail-city-check" value="${escapeHtml(id)}" checked />
        <span>
          <strong>${index + 1}. ${name}</strong>
          <small>${pref} / 現在: ${statusById(record.status).label}${exists ? "" : " / データ未確認"}</small>
        </span>
      </label>`;
    })
    .join("");

  const rides = state.rides || [];
  byId("rideLog").innerHTML = rides.length
    ? rides
        .slice()
        .reverse()
        .map((ride) => `<article class="mini-card">
          <strong>${escapeHtml(ride.routeName)}</strong>
          <small>${ride.date} / ${ride.from} → ${ride.to}</small>
          ${tagsHtml([ride.statusLabel, `${ride.cityCount}市区町村`].join(","))}
        </article>`)
        .join("")
    : `<article class="mini-card"><strong>乗車ログはまだありません</strong><p>鉄路で登録するとここに履歴が残ります。</p></article>`;
}

function renderRailCityDatalist() {
  const pref = byId("railAddPrefSelect").value || selectedPref;
  byId("railCityDatalist").innerHTML = citiesForPref(pref)
    .map((city) => `<option value="${city.name}"></option>`)
    .join("");
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
    : `<article class="mini-card"><strong>旅行メモはまだありません</strong><p>旅ごとに乗った路線や訪問した市区町村をまとめられます。</p></article>`;
}

function renderStats() {
  const rows = prefectures
    .map((pref) => ({ ...pref, count: recordedCities(pref.name).length, ratio: prefRatio(pref.name) }))
    .filter((pref) => !onlyRemaining || pref.count === 0);

  byId("onlyRemainingButton").textContent = onlyRemaining ? "すべて表示" : "未登録だけ";
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
    .filter((item) => item.count > 0 && item.remaining > 0)
    .sort((a, b) => a.remaining - b.remaining)
    .slice(0, 5);

  byId("suggestions").innerHTML = suggestions.length
    ? suggestions
        .map((item) => `<article class="mini-card">
          <strong>${item.pref.name} あと${item.remaining}件</strong>
          <p>次は${item.next.name}を埋めると制覇率が上がります。</p>
        </article>`)
        .join("")
    : `<article class="mini-card"><strong>鉄路登録から始めるのがおすすめ</strong><p>北海道や関東の路線で通過市区町村をまとめて登録できます。</p></article>`;
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
  const id = cityId(pref, name);
  const current = statusById(recordFor(id).status);
  const incoming = statusById(statusId);
  if (incoming.score < current.score) return;
  state.records[id] = {
    ...recordFor(id),
    status: incoming.id,
    source: "rail",
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

  const pref = event.target.closest(".pref-card, .map-tile");
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
  citySearch = "";
  byId("citySearchInput").value = "";
  saveState();
  renderCities();
});

byId("citySearchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  citySearch = byId("citySearchInput").value.trim();
  renderCities();
});

byId("citySearchInput").addEventListener("input", (event) => {
  citySearch = event.target.value.trim();
  renderCities();
});

byId("routeSelect").addEventListener("change", renderRouteOptions);
byId("railFromSelect").addEventListener("change", renderRail);
byId("railToSelect").addEventListener("change", renderRail);
byId("railAddPrefSelect").addEventListener("change", renderRailCityDatalist);

byId("selectAllRailButton").addEventListener("click", () => {
  document.querySelectorAll(".rail-city-check").forEach((input) => {
    input.checked = true;
  });
});

byId("clearRailButton").addEventListener("click", () => {
  document.querySelectorAll(".rail-city-check").forEach((input) => {
    input.checked = false;
  });
});

byId("addRailCityButton").addEventListener("click", () => {
  const pref = byId("railAddPrefSelect").value;
  const name = byId("railAddCityInput").value.trim();
  if (!name) return;
  if (!municipalityExists(pref, name)) {
    alert("その都道府県の市区町村データに見つかりません。表記を確認してください。");
    return;
  }
  manualRailStops.push([pref, name]);
  byId("railAddCityInput").value = "";
  renderRail();
});

byId("railForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const route = routePresets.find((item) => item.id === byId("routeSelect").value) || routePresets[0];
  const status = byId("railStatusSelect").value;
  const selected = Array.from(document.querySelectorAll(".rail-city-check:checked"))
    .map((input) => input.value.split("::"));
  selected.forEach(([pref, name]) => applyCityStatus(pref, name, status, `${route.line}で通過`));
  const segment = routeSegment(route);
  state.rides.push({
    id: crypto.randomUUID(),
    routeName: route.name,
    from: segment[0]?.[1] || "",
    to: segment[segment.length - 1]?.[1] || "",
    status,
    statusLabel: statusById(status).label,
    cityCount: selected.length,
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
  state = { records: {}, trips: [], rides: [] };
  saveState();
  renderAll();
  showScreen("prefScreen");
});

renderBaseOptions();
saveState();
renderAll();

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("./sw.js?v=3").catch(() => {});
}
