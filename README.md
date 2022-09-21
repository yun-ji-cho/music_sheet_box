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

<br/>

# 🔧 사용기술
* <b>Common</b> Yarn / EsLint / Prettier
* <b>Front-end</b> TypeScript / JavaScript / React / Recoil / SCSS 
<br/>

# 🗂️ 폴더구조
<details markdown="1">
<summary>펼치기</summary>

```
📦src
 ┣ 📂assets
 ┃ ┣ 📂images
 ┃ ┃ ┣ 📜bouncing_box.gif
 ┃ ┃ ┣ 📜default_img.png
 ┃ ┃ ┗ 📜loading.gif
 ┃ ┗ 📂svg
 ┃ ┃ ┣ 📜alert_check.svg
 ┃ ┃ ┣ 📜alert_warning.svg
 ┃ ┃ ┣ 📜arrow_down.svg
 ┃ ┃ ┣ 📜arrow_next.svg
 ┃ ┃ ┣ 📜arrow_prev.svg
 ┃ ┃ ┣ 📜chevron_left.svg
 ┃ ┃ ┣ 📜clock.svg
 ┃ ┃ ┣ 📜close.svg
 ┃ ┃ ┣ 📜download.svg
 ┃ ┃ ┣ 📜file_image.svg
 ┃ ┃ ┣ 📜filter.svg
 ┃ ┃ ┣ 📜gnb_list.svg
 ┃ ┃ ┣ 📜gnb_search.svg
 ┃ ┃ ┣ 📜gnb_upload.svg
 ┃ ┃ ┣ 📜header_envelope.svg
 ┃ ┃ ┣ 📜header_save-box.svg
 ┃ ┃ ┣ 📜header_share.svg
 ┃ ┃ ┣ 📜heart.svg
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┣ 📜like.svg
 ┃ ┃ ┣ 📜logo.svg
 ┃ ┃ ┣ 📜plus.svg
 ┃ ┃ ┣ 📜round_close.svg
 ┃ ┃ ┗ 📜star.svg
 ┣ 📂components
 ┃ ┣ 📂Button
 ┃ ┃ ┣ 📜button.module.scss
 ┃ ┃ ┗ 📜Button.tsx
 ┃ ┣ 📂DropDown
 ┃ ┃ ┣ 📜dropDown.module.scss
 ┃ ┃ ┗ 📜DropDown.tsx
 ┃ ┣ 📂Header
 ┃ ┃ ┣ 📜header.module.scss
 ┃ ┃ ┗ 📜Header.tsx
 ┃ ┣ 📂Item
 ┃ ┃ ┣ 📜item.module.scss
 ┃ ┃ ┗ 📜Item.tsx
 ┃ ┣ 📂Loading
 ┃ ┃ ┣ 📜loading.module.scss
 ┃ ┃ ┗ 📜Loading.tsx
 ┃ ┣ 📂Modal
 ┃ ┃ ┣ 📂ConfirmModal
 ┃ ┃ ┃ ┣ 📜confirmModal.module.scss
 ┃ ┃ ┃ ┗ 📜ConfirmModal.tsx
 ┃ ┃ ┣ 📂GNB
 ┃ ┃ ┃ ┣ 📜gnb.module.scss
 ┃ ┃ ┃ ┗ 📜GNB.tsx
 ┃ ┃ ┗ 📜Portal.tsx
 ┃ ┣ 📂PageLayout
 ┃ ┃ ┣ 📜pageLayout.module.scss
 ┃ ┃ ┗ 📜PageLayout.tsx
 ┃ ┣ 📂Pagination
 ┃ ┃ ┣ 📜pagination.module.scss
 ┃ ┃ ┗ 📜Pagination.tsx
 ┃ ┗ 📂PostEditor
 ┃ ┃ ┣ 📂UploadImage
 ┃ ┃ ┃ ┣ 📜uploadImage.module.scss
 ┃ ┃ ┃ ┗ 📜UploadImage.tsx
 ┃ ┃ ┣ 📜postEditor.module.scss
 ┃ ┃ ┗ 📜PostEditor.tsx
 ┣ 📂hooks
 ┃ ┣ 📂state
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂worker
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜useAxios.tsx
 ┃ ┃ ┗ 📜useAxiosCore.tsx
 ┃ ┗ 📜index.tsx
 ┣ 📂pages
 ┃ ┣ 📂Board
 ┃ ┃ ┣ 📂SortDropDown
 ┃ ┃ ┃ ┣ 📜sortDropDown.module.scss
 ┃ ┃ ┃ ┗ 📜SortDropDown.tsx
 ┃ ┃ ┣ 📜board.module.scss
 ┃ ┃ ┗ 📜Board.tsx
 ┃ ┣ 📂Detail
 ┃ ┃ ┣ 📜detail.module.scss
 ┃ ┃ ┗ 📜Detail.tsx
 ┃ ┣ 📂Edit
 ┃ ┃ ┣ 📜edit.module.scss
 ┃ ┃ ┗ 📜Edit.tsx
 ┃ ┣ 📂Search
 ┃ ┃ ┣ 📂FilterModal
 ┃ ┃ ┃ ┣ 📜filterModal.module.scss
 ┃ ┃ ┃ ┗ 📜FilterModal.tsx
 ┃ ┃ ┣ 📂ResultItem
 ┃ ┃ ┃ ┣ 📜resultItem.module.scss
 ┃ ┃ ┃ ┗ 📜ResultItem.tsx
 ┃ ┃ ┣ 📂SearchBox
 ┃ ┃ ┃ ┣ 📜searchBox.module.scss
 ┃ ┃ ┃ ┗ 📜SearchBox.tsx
 ┃ ┃ ┣ 📂SearchForm
 ┃ ┃ ┃ ┣ 📜searchForm.module.scss
 ┃ ┃ ┃ ┗ 📜SearchForm.tsx
 ┃ ┃ ┣ 📂SearchResult
 ┃ ┃ ┃ ┣ 📜searchResult.module.scss
 ┃ ┃ ┃ ┗ 📜SearchResult.tsx
 ┃ ┃ ┣ 📂Tag
 ┃ ┃ ┃ ┣ 📜tag.module.scss
 ┃ ┃ ┃ ┗ 📜Tag.tsx
 ┃ ┃ ┣ 📂TextFilter
 ┃ ┃ ┃ ┣ 📜textFilter.module.scss
 ┃ ┃ ┃ ┗ 📜TextFilter.tsx
 ┃ ┃ ┣ 📜BoldText.tsx
 ┃ ┃ ┣ 📜search.module.scss
 ┃ ┃ ┗ 📜Search.tsx
 ┃ ┗ 📂Upload
 ┃ ┃ ┣ 📜upload.module.scss
 ┃ ┃ ┗ 📜Upload.tsx
 ┣ 📂routes
 ┃ ┣ 📜index.jsx
 ┃ ┗ 📜Routes.module.scss
 ┣ 📂service
 ┃ ┗ 📜getMusicSheetApi.ts
 ┣ 📂states
 ┃ ┗ 📜music.atom.ts
 ┣ 📂styles
 ┃ ┣ 📂base
 ┃ ┃ ┣ 📜_fonts.scss
 ┃ ┃ ┣ 📜_more.scss
 ┃ ┃ ┗ 📜_reset.scss
 ┃ ┣ 📂constants
 ┃ ┃ ┣ 📜_colors.scss
 ┃ ┃ ┣ 📜_levels.scss
 ┃ ┃ ┗ 📜_sizes.scss
 ┃ ┣ 📂mixins
 ┃ ┃ ┣ 📜_animation.scss
 ┃ ┃ ┣ 📜_flexbox.scss
 ┃ ┃ ┣ 📜_position.scss
 ┃ ┃ ┣ 📜_responsive.scss
 ┃ ┃ ┣ 📜_typography.scss
 ┃ ┃ ┗ 📜_visual.scss
 ┃ ┣ 📜index.js
 ┃ ┗ 📜index.scss
 ┣ 📂types
 ┃ ┗ 📜index.ts
 ┣ 📂utils
 ┃ ┗ 📜axios.ts
 ┣ 📜index.tsx
 ┣ 📜logo.svg
 ┣ 📜react-app-env.d.ts
 ┣ 📜reportWebVitals.ts
 ┗ 📜setupTests.ts
```
<br/>
</details>

# 💡 기능 설명

### Search
* 저장한 악보를 검색합니다. 
- 검색어를 입력하지 않을고 검색 버튼을 누르면 alert 창이 뜹니다.
- 검색창에 단어를 치면 전체 검색 결과를 보여줍니다.
- 필터창을 열어 단어를 제목과 타이틀에서 부분검색 할 수 있습니다. 또한 Code, Category 로 상세조건을 주어 검색할 수 있습니다. 
- 필터를 사용하여 검색시 분류 키워드가 태그로 나타납니다. 태그를 삭제하면 필터창에서도 초기화 됩니다.

[screen-recording.webm](https://user-images.githubusercontent.com/73115315/191522825-f7c74216-a4f5-440a-9380-9863e176f64d.webm)


<br/><br/>

* 게시판 : 저장한 악보의 리스트를 보여줍니다. 

![image](https://user-images.githubusercontent.com/73115315/172043500-b776645a-f52d-4fdc-89eb-e9376c431b69.png)

<br/><br/>

* Posting : 악보를 타이틀과 세부 정보와 함께 올립니다.

![image](https://user-images.githubusercontent.com/73115315/172043544-4e767059-c324-4263-ab9b-50a0e517c814.png)

<br/><br/>

<br/>

# 어려웠던 점
셀렉트 박스는 Search 페이지, Upload 페이지에서 모두 쓰이고 값이 다르게 들어가기 때문에 커스텀 하는게 시간이 오래걸렸다. 
컴포넌트를 잘게 쪼개니 데이터를 props 로 넘기고 받는 과정이 복잡했다. 데이터를 관리하는 부분이 어려웠다.

