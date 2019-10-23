const rootEl = document.getElementById('root');

const links = [];

const addFormEl = document.createElement('form');
addFormEl.innerHTML = `
<div class="form1">
    <input data-id="link" placeholder="Введите тест или url источника" size="30">
</div>
    <select data-id="type">
        <option value="regular">Обычный</option>
        <option value="image">Изображение</option>
        <option value="audio">Аудио</option>
        <option value="video">Видео</option>
    </select>
    <button class="btn btn-primary">Добавить</button>
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
        likes: 0,
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
                    <button class="btn btn-primary" data-action="like">👍🏼: ${item.likes}</button>
                    <button class="btn btn-secondary" data-action="dislike">👎🏻</button>
                </div>
            </div>
            `;
        } else if (item.type === 'image') {
            liEl.innerHTML = `
            <div class="card">
                <img src="${item.value}" class="card-img-top">
                <div class="card-body">
                    <button class="btn btn-primary" data-action="like">👍🏼: ${item.likes}</button>
                    <button class="btn btn-secondary" data-action="dislike">👎🏻</button>
                </div>
            </div>
                `;
        } else if (item.type === 'video') {
            liEl.innerHTML = `
            <div class="card">
                <div class="embed-responsive embed-responsive-16by9">
                     <iframe class="embed-responsive-item" src="${item.value}"></iframe>
                </div>
                <div class="card-body">
                    <button class="btn btn-primary" data-action="like">👍🏼: ${item.likes}</button>
                    <button class="btn btn-secondary" data-action="dislike">👎🏻</button>
                </div>
            </div>
            `;
        } else if (item.type === 'audio') {
            liEl.innerHTML = `
            <div class="card">
                <div class="card-img-top">
                    <audio src="${item.value}" controls></audio>
                </div>
                <div class="card-body">
                    <button class="btn btn-primary" data-action="like">👍🏼: ${item.likes}</button>
                    <button class="btn btn-secondary" data-action="dislike">👎🏻</button>
                </div>
            </div>
            `;
        }
        liEl.onclick = function () {
            item.done = !item.done;
            rebuildList(containerEl, items);
        };
        const likeEl = liEl.querySelector('[data-action=like]');
        likeEl.onclick = function () {
            item.likes++;
            rebuildTree(containerEl, items);
        };

        const dislikeEl = liEl.querySelector('[data-action=dislike]');
        dislikeEl.onclick = function () {
            item.likes--;
            rebuildTree(containerEl, items);
        };
        containerEl.appendChild(liEl);
    }
}
