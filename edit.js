//DOM connecting
const docs = {
    colorBtn: document.querySelector('.colorBtn'),
    fontSizeBtn: document.querySelector('.fontSizeBtn'),
    bgColorBtn: document.querySelector('.bgColorBtn'),
    text: document.querySelector('.text'),
    colorType: document.querySelector('.colorType'),
    fontType: document.querySelector('.fontType'),
    bgColorType: document.querySelector('.bgColorType'),
    toJson: document.querySelector('.toJson'),
    edit: document.querySelector('.edit'),
    editText: document.querySelector('.editText'),
    preview: document.querySelector('.preview'),
    showMe: document.querySelector('.showMe'),
    panel: document.querySelector('.panel')
}
let state, jsonObj = [], newObj, selected;
//methods for eventListener
const events = {
    //preparing to editing, creating main info object for json
    edit() {
        docs.toJson.style.display = 'block';
        docs.edit.style.display = 'none';
        docs.panel.style.visibility = 'visible';
        docs.text.style.display = 'none';
        docs.editText.style.display = 'block';
        state = docs.text.value.split(' ');
        docs.editText.innerHTML = state;
        state.map((word) => {
            newObj = {
                text: word,
                color: 'black',
                fontSize: '18px',
                bgColor: 'none'
            };
            jsonObj.push(newObj);
            docs.toJson.addEventListener("click", events.parse);
        })
    },
    //appearing edit object on the screen
    renderPreview() {
        docs.preview.innerHTML = '';
        jsonObj.map((obj) => {
            let span4ik = document.createElement("SPAN");
            span4ik.style.color = obj.color;
            span4ik.style.backgroundColor = obj.bgColor;
            span4ik.style.fontSize = obj.fontSize;
            let inner = document.createTextNode(`${obj.text} `);
            span4ik.appendChild(inner);
            docs.preview.appendChild(span4ik);
        })
    },
    //main method for changing property of selected object
    styleChanger(typeEdit, editProperty) {
        if (window.getSelection().toString() && docs[editProperty].value) {
            selected = document.getSelection().toString();
            jsonObj.map((obj) => {
                if (obj.text === selected)
                    obj[typeEdit] = docs[editProperty].value;
            })
        } else alert(`Enter ${editProperty} or SELECT needed word`)
        this.renderPreview();
    },
    //combine and parse method, make a solid json object with combining same styles
    parse() {
        for (let z = 0; z < jsonObj.length; z++) {

            //z === 0 && jsonObj.push(jsonObj[z]);
            if (z > 0 && jsonObj[z].color === jsonObj[z - 1].color && jsonObj[z].bgColor === jsonObj[z - 1].bgColor && jsonObj[z].fontSize === jsonObj[z - 1].fontSize) {
                jsonObj[z - 1].text += ` ${jsonObj[z].text}`;
                jsonObj.splice(z, 1);
                z--;
            }

        }
        events.renderPreview();
        docs.showMe.innerHTML = JSON.stringify(jsonObj);
        console.log(JSON.stringify(jsonObj));
    }
}
//event listeners initializations
docs.colorBtn.addEventListener("click", () => events.styleChanger('color', 'colorType'));
docs.fontSizeBtn.addEventListener("click", () => events.styleChanger('fontSize', 'fontType'));
docs.bgColorBtn.addEventListener("click", () => events.styleChanger('bgColor', 'bgColorType'));
docs.edit.addEventListener("click", () => {
    docs.text.value !== ''
        ? events.edit()
        : alert('enter a few words')
});
docs.toJson.addEventListener("click", () => events.parse());

