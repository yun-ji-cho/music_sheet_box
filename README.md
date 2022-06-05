# 🎼 나만의 악보 올리기 APP
내가 만든 악보를 보관하고 검색할 수 있는 앱입니다.
<br/>

# 🎬 실행방법 
1. git clone https://github.com/yun-ji-cho/music_sheet_box.git
2. cd music_sheet_box
3. yarn install
4. yarn start
5. http://localhost:3000 접속
<br/>

# 🔊 프로젝트 소개
- 개발 기간 : 2022.05.31 - 2022.06.05
- 개요 : 취미 생활로 피아노를 치는데 기존의 악보를 편곡하여 수정한 악보를 저장해 뒀다가 필요할 때마다 꺼내서 봅니다.
악보를 이미지로만 저장을 해두다 보니 악보 찾는게 어려워서 이미지와 악보명을 같이 묶어서 저장해 놓으면 악보를 찾기 쉽겠다는 생각으로 만든 앱입니다.  

악보를 저장할때 입력할수 있는 값으로는 title, Music Code, Category, Note 가 있습니다.
저장할 때 
<br/>

# 🔧 사용기술
* <b>Common</b> Yarn / EsLint / Prettier
* <b>Front-end</b> TypeScript / JavaScript / React / Recoil / SCSS 
<br/>

# 🗂️ 폴더구조
<details markdown="1">
<summary>펼치기</summary>

```
src
 ┣ assets
 ┃ ┣ images
 ┃ ┃ ┗ 1.jpg
 ┃ ┗ svgs
 ┃ ┃ ┣ chevron_left.svg
 ┃ ┃ ┣ close.svg
 ┃ ┃ ┣ download.svg
 ┃ ┃ ┣ file_image.svg
 ┃ ┃ ┣ gnb_list.svg
 ┃ ┃ ┣ gnb_search.svg
 ┃ ┃ ┣ gnb_upload.svg
 ┃ ┃ ┣ header_envelope.svg
 ┃ ┃ ┣ header_save-box.svg
 ┃ ┃ ┣ header_share.svg
 ┃ ┃ ┣ heart.svg
 ┃ ┃ ┣ index.js
 ┃ ┃ ┣ logo.svg
 ┃ ┃ ┗ plus.svg
 ┣ components
 ┃ ┣ Button
 ┃ ┃ ┣ button.module.scss
 ┃ ┃ ┗ Button.tsx
 ┃ ┣ GNB
 ┃ ┃ ┣ gnb.module.scss
 ┃ ┃ ┗ GNB.tsx
 ┃ ┣ Header
 ┃ ┃ ┣ header.module.scss
 ┃ ┃ ┗ Header.tsx
 ┃ ┣ Layout
 ┃ ┃ ┣ layout.module.scss
 ┃ ┃ ┗ Layout.tsx
 ┃ ┣ Modal
 ┃ ┃ ┣ ConfirmModal
 ┃ ┃ ┃ ┣ confirmModal.module.scss
 ┃ ┃ ┃ ┗ ConfirmModal.tsx
 ┃ ┃ ┣ ItemViewModal
 ┃ ┃ ┃ ┣ ItemViewModal.module.scss
 ┃ ┃ ┃ ┗ ItemViewModal.tsx
 ┃ ┃ ┗ Potal.tsx
 ┃ ┗ gnb.module.scss
 ┣ data
 ┃ ┗ data.ts
 ┣ hooks
 ┃ ┣ worker
 ┃ ┃ ┣ index.tsx
 ┃ ┃ ┣ useAxios.tsx
 ┃ ┃ ┗ useAxiosCore.tsx
 ┃ ┗ index.tsx
 ┣ pages
 ┃ ┣ Board
 ┃ ┃ ┣ Item
 ┃ ┃ ┃ ┣ item.module.scss
 ┃ ┃ ┃ ┗ Item.tsx
 ┃ ┃ ┣ board.module.scss
 ┃ ┃ ┗ Board.tsx
 ┃ ┣ Search
 ┃ ┃ ┣ search.module.scss
 ┃ ┃ ┗ Search.tsx
 ┃ ┗ Upload
 ┃ ┃ ┣ upload.module.scss
 ┃ ┃ ┗ Upload.tsx
 ┣ recoil
 ┃ ┗ music.atom.ts
 ┣ routes
 ┃ ┣ index.jsx
 ┃ ┗ Routes.module.scss
 ┣ service
 ┃ ┗ getMusicSheetApi.ts
 ┣ styles
 ┃ ┣ base
 ┃ ┃ ┣ _fonts.scss
 ┃ ┃ ┣ _more.scss
 ┃ ┃ ┗ _reset.scss
 ┃ ┣ constants
 ┃ ┃ ┣ _colors.scss
 ┃ ┃ ┣ _levels.scss
 ┃ ┃ ┗ _sizes.scss
 ┃ ┣ mixins
 ┃ ┃ ┣ _animation.scss
 ┃ ┃ ┣ _flexbox.scss
 ┃ ┃ ┣ _position.scss
 ┃ ┃ ┣ _responsive.scss
 ┃ ┃ ┣ _typography.scss
 ┃ ┃ ┗ _visual.scss
 ┃ ┣ index.js
 ┃ ┗ index.scss
 ┣ types
 ┃ ┗ index.ts
 ┣ utils
 ┃ ┗ axios.ts
 ┣ index.tsx
 ┣ logo.svg
 ┣ react-app-env.d.ts
 ┣ reportWebVitals.ts
 ┗ setupTests.ts
```
<br/>
</details>

# 💡 기능 설명
<br/>

# 🔥 추가 개발 list
<br/>

# 🥲 아쉬운 점


