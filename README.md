# πΌ λλ§μ μλ³΄ μ¬λ¦¬κΈ° APP
λ΄κ° λ§λ  μλ³΄λ₯Ό λ³΄κ΄νκ³  κ²μν  μ μλ μ±μλλ€.
<br/>

# π¬ μ€νλ°©λ² 
1. git clone https://github.com/yun-ji-cho/music_sheet_box.git
2. cd music_sheet_box
3. yarn install
4. yarn start
5. http://localhost:3000 μ μ
<br/>

# π νλ‘μ νΈ μκ°
- κ°μ : μ·¨λ―Έ μνλ‘ νΌμλΈλ₯Ό μΉλλ° κΈ°μ‘΄μ μλ³΄λ₯Ό νΈκ³‘νμ¬ μμ ν μλ³΄λ₯Ό μ μ₯ν΄ λλ€κ° νμν  λλ§λ€ κΊΌλ΄μ λ΄λλ€.<br/>
μλ³΄λ₯Ό μ΄λ―Έμ§λ‘λ§ μ μ₯μ ν΄λλ€ λ³΄λ μλ³΄ μ°Ύλκ² μ΄λ €μμ μ΄λ―Έμ§μ μλ³΄λͺμ κ°μ΄ λ¬Άμ΄μ μ μ₯ν΄ λμΌλ©΄ μλ³΄λ₯Ό μ°ΎκΈ° μ½κ² λ€λ μκ°μΌλ‘ λ§λ  μ±μλλ€.  
- λ°°ν¬λ§ν¬ : https://music-sheet-box.netlify.app/

μλ³΄λ₯Ό μ μ₯ν λ μλ ₯ν μ μλ κ°μΌλ‘λ image, title, Music Code, Category, Note κ° μμ΅λλ€.
<br/>

# π§ μ¬μ©κΈ°μ 
* <b>Common</b> Yarn / EsLint / Prettier
* <b>Front-end</b> TypeScript / JavaScript / React / Recoil / SCSS 
<br/>

# ποΈ ν΄λκ΅¬μ‘°
<details markdown="1">
<summary>νΌμΉκΈ°</summary>

```
src
 β£ assets
 β β£ images
 β β β 1.jpg
 β β svg
 β β β£ chevron_left.svg
 β β β£ close.svg
 β β β£ download.svg
 β β β£ file_image.svg
 β β β£ gnb_list.svg
 β β β£ gnb_search.svg
 β β β£ gnb_upload.svg
 β β β£ header_envelope.svg
 β β β£ header_save-box.svg
 β β β£ header_share.svg
 β β β£ heart.svg
 β β β£ index.js
 β β β£ logo.svg
 β β β plus.svg
 β£ components
 β β£ Button
 β β β£ button.module.scss
 β β β Button.tsx
 β β£ GNB
 β β β£ gnb.module.scss
 β β β GNB.tsx
 β β£ Header
 β β β£ header.module.scss
 β β β Header.tsx
 β β£ Layout
 β β β£ layout.module.scss
 β β β Layout.tsx
 β β£ Modal
 β β β£ ConfirmModal
 β β β β£ confirmModal.module.scss
 β β β β ConfirmModal.tsx
 β β β£ ItemViewModal
 β β β β£ ItemViewModal.module.scss
 β β β β ItemViewModal.tsx
 β β β Potal.tsx
 β β gnb.module.scss
 β£ data
 β β data.ts
 β£ hooks
 β β£ worker
 β β β£ index.tsx
 β β β£ useAxios.tsx
 β β β useAxiosCore.tsx
 β β index.tsx
 β£ pages
 β β£ Board
 β β β£ Item
 β β β β£ item.module.scss
 β β β β Item.tsx
 β β β£ board.module.scss
 β β β Board.tsx
 β β£ Search
 β β β£ search.module.scss
 β β β Search.tsx
 β β Upload
 β β β£ upload.module.scss
 β β β Upload.tsx
 β£ recoil
 β β music.atom.ts
 β£ routes
 β β£ index.jsx
 β β Routes.module.scss
 β£ service
 β β getMusicSheetApi.ts
 β£ styles
 β β£ base
 β β β£ _fonts.scss
 β β β£ _more.scss
 β β β _reset.scss
 β β£ constants
 β β β£ _colors.scss
 β β β£ _levels.scss
 β β β _sizes.scss
 β β£ mixins
 β β β£ _animation.scss
 β β β£ _flexbox.scss
 β β β£ _position.scss
 β β β£ _responsive.scss
 β β β£ _typography.scss
 β β β _visual.scss
 β β£ index.js
 β β index.scss
 β£ types
 β β index.ts
 β£ utils
 β β axios.ts
 β£ index.tsx
 β£ logo.svg
 β£ react-app-env.d.ts
 β£ reportWebVitals.ts
 β setupTests.ts
```
<br/>
</details>

# π‘ κΈ°λ₯ μ€λͺ
* κ²μμ°½ : μ μ₯ν μλ³΄λ₯Ό κ²μν©λλ€. νμ΄ν, λ΄μ©, Code, Category λ‘ κ²μν  μ μμ΅λλ€. 
* Filter λ²νΌμ λλ¬μ μμΈ μ‘°κ±΄μ μ ννλ©΄ κ²μμ°½ λ°μ νκ·Έκ° λνλ©λλ€.

![image](https://user-images.githubusercontent.com/73115315/173238637-22d36e65-9e94-4685-a6fb-3550728448f2.png)
![image](https://user-images.githubusercontent.com/73115315/173238666-b35cb3c6-f2df-4c74-bcbd-e892a52b267a.png)
![image](https://user-images.githubusercontent.com/73115315/173238679-0143d949-3bf8-492b-a812-31fb23fd61ee.png)


<br/><br/>

* κ²μν : μ μ₯ν μλ³΄μ λ¦¬μ€νΈλ₯Ό λ³΄μ¬μ€λλ€. 

![image](https://user-images.githubusercontent.com/73115315/172043500-b776645a-f52d-4fdc-89eb-e9376c431b69.png)

<br/><br/>

* Posting : μλ³΄λ₯Ό νμ΄νκ³Ό μΈλΆ μ λ³΄μ ν¨κ» μ¬λ¦½λλ€.

![image](https://user-images.githubusercontent.com/73115315/172043544-4e767059-c324-4263-ab9b-50a0e517c814.png)

<br/><br/>

# π₯ μΆκ° κ°λ° LIST
1. ν¬μ€ννκ³  κ²μνμΌλ‘ μ΄λνμ λ μλ‘κ³ μΉ¨ μμ΄ κ²μνμ μλ°μ΄νΈ 
2. κ²μ κ²°κ³Όμ λ°λ₯Έ λ¦¬μ€νΈ λ³΄μ¬μ£ΌκΈ°
3. ν¬μ€ν μ’μμ κΈ°λ₯, μ­μ , μμ 
4. κ²μν νν°κΈ°λ₯

<br/>

# μ΄λ €μ λ μ 
μλ νΈ λ°μ€λ Search νμ΄μ§, Upload νμ΄μ§μμ λͺ¨λ μ°μ΄κ³  κ°μ΄ λ€λ₯΄κ² λ€μ΄κ°κΈ° λλ¬Έμ μ»€μ€ν νλκ² μκ°μ΄ μ€λκ±Έλ Έλ€. 
μ»΄ν¬λνΈλ₯Ό μκ² μͺΌκ°λ λ°μ΄ν°λ₯Ό props λ‘ λκΈ°κ³  λ°λ κ³Όμ μ΄ λ³΅μ‘νλ€. λ°μ΄ν°λ₯Ό κ΄λ¦¬νλ λΆλΆμ΄ μ΄λ €μ λ€.

