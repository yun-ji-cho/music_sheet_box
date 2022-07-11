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
- 개요 : 취미 생활로 피아노를 치는데 기존의 악보를 편곡하여 수정한 악보를 저장해 뒀다가 필요할 때마다 꺼내서 봅니다.<br/>
악보를 이미지로만 저장을 해두다 보니 악보 찾는게 어려워서 이미지와 악보명을 같이 묶어서 저장해 놓으면 악보를 찾기 쉽겠다는 생각으로 만든 앱입니다.  
- 배포링크 : https://music-sheet-box.netlify.app/

악보를 저장할때 입력할수 있는 값으로는 image, title, Music Code, Category, Note 가 있습니다.
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
 ┃ ┗ svg
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
* 검색창 : 저장한 악보를 검색합니다. 타이틀, 내용, Code, Category 로 검색할 수 있습니다. 
* Filter 버튼을 눌러서 상세 조건을 선택하면 검색창 및에 태그가 나타납니다.

![image](https://user-images.githubusercontent.com/73115315/173238637-22d36e65-9e94-4685-a6fb-3550728448f2.png)
![image](https://user-images.githubusercontent.com/73115315/173238666-b35cb3c6-f2df-4c74-bcbd-e892a52b267a.png)
![image](https://user-images.githubusercontent.com/73115315/173238679-0143d949-3bf8-492b-a812-31fb23fd61ee.png)


<br/><br/>

* 게시판 : 저장한 악보의 리스트를 보여줍니다. 

![image](https://user-images.githubusercontent.com/73115315/172043500-b776645a-f52d-4fdc-89eb-e9376c431b69.png)

<br/><br/>

* Posting : 악보를 타이틀과 세부 정보와 함께 올립니다.

![image](https://user-images.githubusercontent.com/73115315/172043544-4e767059-c324-4263-ab9b-50a0e517c814.png)

<br/><br/>

# 🔥 추가 개발 LIST
1. 포스팅하고 게시판으로 이동했을 때 새로고침 없이 게시판에 업데이트 
2. 검색 결과에 따른 리스트 보여주기
3. 포스팅 좋아요 기능, 삭제, 수정
4. 게시판 필터기능

<br/>

# 어려웠던 점
셀렉트 박스는 Search 페이지, Upload 페이지에서 모두 쓰이고 값이 다르게 들어가기 때문에 커스텀 하는게 시간이 오래걸렸다. 
컴포넌트를 잘게 쪼개니 데이터를 props 로 넘기고 받는 과정이 복잡했다. 데이터를 관리하는 부분이 어려웠다.

