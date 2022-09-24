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
- 개요 : 취미 생활로 피아노를 치는데 기존의 악보를 편곡하여 수정한 악보를 저장해 뒀다가 필요할 때마다 꺼내서 보곤했습니다.<br/>
그런데 악보를 이미지로만 저장을 해두다 보니 악보 찾는게 어려워서 이미지와 악보명을 같이 묶어서 저장해 놓으면 악보를 찾기 쉽겠다는 생각으로 만든 앱입니다.  
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

# 💡 기능구현

### GNB

[screen-recording (2).webm](https://user-images.githubusercontent.com/73115315/192100202-29bda4ff-8c52-477a-b7a9-a6a13f060158.webm)

#### 동작
- 우측 상단에 햄버거 버튼을 클릭하면 GNB가 열립니다.
- 활성화 된 페이지에 해당하는 링크는 파란색으로 칠해집니다.
- GNB로 이동시 모든 입력값들은 초기화 됩니다.

#### 구현방법
- Portal 을 이용해서 GNB를 App 컴포넌트 외부에 위치시켰습니다. DOM의 계층구조 시스템에 종속되지 않으면서 컴포넌트를 렌더링 하기 위함입니다.
- react-router-dom 에서 제공하는 NavLink 컴포넌트를 이용해서 현재url과 일치하는 요소에 스타일 속성을 추가하여 활성화된 것을 표현했습니다.
<br/><br/>


### Search

[screen-recording.webm](https://user-images.githubusercontent.com/73115315/191522825-f7c74216-a4f5-440a-9380-9863e176f64d.webm)

#### 동작
- 저장한 악보를 검색합니다. 
- 검색어를 입력하지 않고 검색 버튼을 누르면 alert 창이 뜹니다.
- 검색어를 입력하면 해당 단어에 대한 전체 검색 결과를 보여줍니다.
- 필터창을 열어 검색어를 제목과 내용으로 상세검색을 할 수 있습니다. 또한 Code, Category 셀렉트 박스를 선택해 상세 조건을 주어 검색이 가능합니다. 
- 필터를 사용하여 검색시 분류 키워드가 태그로 나타납니다. 태그를 삭제하면 필터창에서도 초기화 됩니다.
- 검색된 단어와 일치하는 글씨는 주황색으로 하이라이트처리됩니다.

#### 구현방법
- 검색한 단어와 일치된 데이터를 가져오기 위한 도구로 React-query 라이브러리의 useQuery를 사용했습니다. 데이터를 불러올때 지연되는 시간에 로딩아이콘을 띄우기 쉽고 데이터를 업데이트 하는 것이 편리하기 때문에 사용하였습니다.
- 검색한 결과로 불러온 데이터에서 이미지를 불러오는데 문제가 있다면 쌤플 이미지를 띄우도록 하였습니다.
- Filter창, alert 창도 GNB 와 마찬가지로 Portal 을 사용하였습니다. alert 창의 형태가 조금씩 다른 것은 Props 값을 달리주어 구현하였습니다.
- Portal 로 만들어진 Filter창에서 선택한 상세조건(state)들이 App 컴포넌트에서 태그 형태로 나타나야 했으므로 이 상태값들은 recoil을 사용하였습니다.

<br/><br/>

### BOARD

![image](https://user-images.githubusercontent.com/73115315/172043500-b776645a-f52d-4fdc-89eb-e9376c431b69.png)

#### 동작
- 저장한 악보 리스트를 보여줍니다. 
- 최신순, 오래된 순으로 정렬할 수 있습니다.
- 항목을 클릭하면 상세 내용이 보여집니다.
- 상세페이지로 가면 수정과 삭제를 할 수 있습니다.
- 삭제시 리스트에 바로 반영이 됩니다.
- 수정시 기존의 내용이 유지되어 보여집니다.

#### 구현방법
- 저장된 데이터를 불러올 때 search 와 같은 함수(getMusicSheetApi)를 사용해서 불러옵니다. 
- Upload 페이지에서 새로운 글이 등록되었을 때 혹은 삭제되었을 때는 refetch 하여 리스트가 업데이트 됩니다.
- sort 메서드를 사용해서 게시물의 생성 날짜를 비교하여 정렬했습니다.
- 상세페이지 이동은 게시물의 id를 받고 react-router-dom의 useNavigate 함수를 사용하여 구현하였습니다.

<br/><br/>

### Upload

[screen-recording (1).webm](https://user-images.githubusercontent.com/73115315/191534468-efb82417-6fbb-445e-94a2-28e576dc148d.webm)

#### 동작
- 악보이미지와 상세 내용을 기록하여 게시글을 등록합니다.
- 이미지 등록시 이미지 미리보기가 가능합니다.
- 이미지 미등록시 alert 창이 뜹니다. 
- 상세 내용을 미입력시 미입력 항목의 입력 테두리가 bold 처리되고 게시글 등록이 되지 않습니다.

#### 구현방법
- 게시글 등록시 미입력된 input은 useRef를 이용하여 focus를 주었고 미 입력된 드롭다운 박스는 각각의 state로 체크하여 css로 테두리를 bold 처리 하였습니다.
- 이미지 미리보기 구현을 위해 FileReader 객체를 사용하였습니다.
- 이미지를 포함한 게시글을 서버에 올리기 위해서 FormData 객체를 사용하였고 React-query 라이브러리의 useMutation를 이용하여 서버에 데이터를 생성했습니다.

<br/><br/>


# 어려웠던 점
- Search 페이지에서 React query의 useQuery 를 사용하여 검색한 단어에 해당하는 정보를 가져올 때, 검색버튼을 눌렀을 때만 get 요청을 해야하는데 예상치 않은 부분에서 get 요청이 되서 그것을 컨트룰 하는것이 어려웠습니다.
- Upload 페이지의 form을 만들때 state의 갯수가 많아지는것과 코드 줄수가 길어지는것 때문에 줄여보려고 했지만 생각만큼 많이 줄여지지 않아서 아쉬웠습니다.
- 이미지를 업로드를 포함한 데이터를 전송 할 때 FormData객체를 사용하는데, 그 이미지 객체의 타입을 지정하는 것이 어려웠습니다.



