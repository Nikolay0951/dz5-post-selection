const rootEl = document.getElementById('root');

const links = [];

const addFormEl = document.createElement('form');
addFormEl.innerHTML = `
    <input data-id="link">
    <select data-id="type">
        <option value="regular">Обычный</option>
        <option value="image">Изображение</option>
        <option value="audio">Аудио</option>
        <option value="video">Видео</option>
    </select>
    <button>Ok</button>
`;

const linkEl = addFormEl.querySelector('[data-id=link]');
const typeEl = addFormEl.querySelector('[data-id=type]');


addFormEl.onsubmit = function (ev) {
    console.log(ev);
    console.log('submit');
    ev.preventDefault();

    console.dir(linkEl);
    const value = linkEl.value;
    const type = typeEl.value;
    console.log(type);
    links.push({
        value,
        type,
    });
    console.log(links);
    linkEl.value = '';

    rebuildList(linksEl, links);
};
rootEl.appendChild(addFormEl);

const linksEl = document.createElement('div');
rootEl.appendChild(linksEl);

function rebuildList(containerEl, items) {
    containerEl.innerHTML = '';
    for (const item of items) {
        const liEl = document.createElement('div');
        liEl.className = 'card-posts';
        if (item.type === 'regular') {
            liEl.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <p class="card-text">${item.value}</p>
                </div>
            </div>
            `;
        } else if (item.type === 'image') {
            liEl.innerHTML = `
            <div class="card">
                <img src="${item.value}" class="card-img-top">
                <div class="card-body"></div>
            </div>
                `;
        } else if (item.type === 'video') {
            liEl.innerHTML = `
            <div class="card">
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" src="${item.value}"></iframe>
                </div>
            </div>
            `;
        } else if (item.type === 'audio') {
            liEl.innerHTML = `
            <div class="card">
                <div class="card-img-top">
                    <audio src="${item.value}" controls></audio>
                </div>
            </div>
            `;
        }
        liEl.onclick = function () {
            item.done = !item.done;
            rebuildList(containerEl, items);
        }
        containerEl.appendChild(liEl);
    }
}
