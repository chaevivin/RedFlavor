# Red Flavor Diary

<div align='center'>

![KakaoTalk_20240131_224317229](https://github.com/chaevivin/RedFlavor/assets/83055813/0dc07d9a-8197-41d7-8a6d-fb856f19730c)

</div>

걸그룹 레드벨벳의 앨범 'The Red Summer - 빨간 맛'을 리디자인하여 시각적으로 다양한 즐길거리를 제공합니다.

<br>
<br>

## 📑 목차

1. [사용 기술](#1-사용-기술)
2. [기획 의도](#2-기획-의도)
3. [기능 설명](#3-기능-설명)
4. [기능 개선](#4-기능-개선)
5. [기타](#5-기타)

<br>
<br>

## 1. 사용 기술

<div align='center'>

<img width="640" alt="red-flavor diary" src="https://github.com/chaevivin/RedFlavor/assets/83055813/2cd821b1-ca47-4275-b09b-e5d5ee5f1806">

</div>

<br>

- 프론트엔드: React.js / TypeScript / Redux / React-Query / styled-components
- Database: Firebase Storage / Firestore Database
- 기타: Fabric.js(Canvas API) / html2canvas(Screenshots) / FileSaver.js(Saving files)
- 협업: Figma / Notion

<br>
<br>

## 2. 기획 의도

레드벨벳에 대한 팬심으로 시작된 프로젝트입니다. 최근 트렌드인 y2k를 컨셉으로 정해 레드벨벳의 곡과 접목시켜 리디자인 하였습니다. 대중들에게 가장 잘 알려진 ‘빨간맛’ 노래로 친숙하게 접근할 수 있고 다양한 즐길거리로 참여를 유도할 수 있습니다.

<br>
<br>

## 3. 기능 설명

### 3.1. Intro

<div align='center'>

![red intro-Photoroom png-Photoroom](https://github.com/chaevivin/RedFlavor/assets/83055813/96a7e727-13d7-4ac4-84bc-3730fa113edf)

</div>

- Main 페이지에 들어가기 전, 0.5초 간격으로 이미지 3개를 보여주어 다이어리 열쇠가 풀리는 모션을 구현하였습니다.

<br>

### 3.2. Main

<div align='center'>

![red main](https://github.com/chaevivin/RedFlavor/assets/83055813/a9213047-9bb7-4f5b-b464-3b286d092bd7)

</div>

- 다양한 메뉴를 보여주는 페이지입니다.
- 메뉴 종류에는 '프로필 보기', '포토카드 꾸미기', '마이룸', 'playlist'가 있고 버튼을 클릭하면 해당 페이지로 이동합니다.

<br>

### 3.3. Profile (프로필 보기)

<div align='center'>

<img width="640" alt="red profile" src="https://github.com/chaevivin/RedFlavor/assets/83055813/af106897-8f01-4371-bef4-4a0a843f7716">

</div>

- 레드벨벳 멤버의 프로필을 보여주는 페이지입니다.
- 멤버 아이콘을 클릭하면 해당 멤버의 상세 프로필 페이지로 이동합니다.
- 프로필 상세 페이지에서 멤버의 다양한 정보를 알 수 있습니다.

<br>

### 3.4. Photocard (포토카드 꾸미기)

<div align='center'>

<img width="640" alt="red photocard" src="https://github.com/chaevivin/RedFlavor/assets/83055813/d086ee7e-ab32-4483-a5a8-e36a28dd78f3">
<img width="640" alt="red photocard1" src="https://github.com/chaevivin/RedFlavor/assets/83055813/256399b4-a9de-44d6-a47e-f50db4fcb664">

</div>

- 레드벨벳 멤버의 이미지를 다양한 도구로 꾸밀 수 있는 페이지입니다.
- 꾸미기 버튼을 클릭하면 하단에 꾸밀 수 있는 패널이 나타납니다. 패널에서 멤버, 배경을 변경하고 스티커, 브러쉬로 이미지 위에 꾸밀 수 있습니다.
  - 멤버: 원하는 멤버의 이미지로 변경할 수 있습니다.
  - 배경: 이미지의 배경을 변경할 수 있습니다.
  - 스티커: 27개의 스티커가 제공됩니다. 스티커는 이동, 크기 조절, 방향 조절, 삭제가 가능합니다.
  - 브러쉬: 10개의 브러쉬가 제공됩니다. 브러쉬는 색, 크기 조절이 가능합니다. 실행 취소, 다시 실행 버튼을 사용할 수 있습니다.
- 예시 버튼을 클릭하면 포토카드 예시 화면을 볼 수 있습니다.
- 초기화 버튼을 클릭하면 꾸몄던 화면이 초기화됩니다.
- 저장 버튼을 클릭하면 꾸민 포토카드를 이미지로 저장할 수 있습니다.

<br>

### 3.5. Loading

<div align='center'>

![red loading](https://github.com/chaevivin/RedFlavor/assets/83055813/bf3cd265-aeec-4e69-8ace-006184919697)

</div>

- My Room 페이지에 들어가기 전 로딩 화면입니다.
- 아이콘들이 위아래로 움직이는 재미있는 애니메이션을 추가하였습니다.

<br>

### 3.6. My Room (마이룸)

<div align='center'>

<img width="640" alt="red myroom" src="https://github.com/chaevivin/RedFlavor/assets/83055813/902f2915-48b0-4518-a59d-a49cbb2cda29">

</div>

- 원하는 캐릭터의 공간을 자유롭게 꾸밀 수 있습니다.
- 캐릭터를 클릭하면 좌측 상단의 하트 게이지가 올라갑니다.
- 말풍선을 클릭하면 말풍선을 변경할 수 있습니다.
- 상태창에 텍스트를 입력하여 자신의 상태를 나타낼 수 있습니다.
- 메뉴를 클릭하여 원하는 멤버의 캐릭터로 변경할 수 있습니다.
  - 캐릭터를 변경하면 하트 게이지가 초기화됩니다.

<br>

### 3.7. Playlist

<div align='center'>

<img width="640" alt="red playlist" src="https://github.com/chaevivin/RedFlavor/assets/83055813/d7fc30fa-baf9-49bb-a249-9e4ab020bc39">

</div>

- 'The Red Summer'에 있는 노래 뿐만 아니라 다양한 노래를 들을 수 있습니다. (저작권 이슈로 노래 플레이 불가능, 버튼은 조작 가능)
- 위, 아래 버튼(▲, ▼)으로 노래를 변경할 수 있습니다.
  - 노래가 변경되면 오른쪽 상단의 트랙 숫자(TrackNum)가 변경됩니다.
- 재생, 멈춤 버튼(↠, ||)으로 노래를 재생하고 멈출 수 있습니다.
  - 노래를 재생하면 상단의 주파수가 움직입니다.
  - 노래를 재생하면 프로그레스바가 이동합니다.
  - 노래를 멈추면 상단의 주파수가 멈춥니다.
  - 노래를 멈추면 프로그레스바가 멈춥니다.

<br>
<br>

## 4. 기능 개선

### 4.1. 이미지 미리 로드
```ts
// src/api/getImgStorage.ts
async preloadImgs(url: string[] | undefined) {
    await Promise.all(
      url?.map(
        (url) =>
          new Promise((resolve) => {
            const image = new Image();
            image.src = url;
            image.onload = resolve;
          })
      ) || []
    );
  }
```
- 문제점: 이미지 양이 많아 이미지 로딩 시간이 긴 문제점이 있었습니다.
- 이미지를 비동기적으로 다운받아 이미지 로드 시간을 단축시켜 사용자 경험을 개선하였습니다.

<br>
<br>

## 5. 기타

### 5.1. 폴더 구조 및 컴포넌트 구성

- `Intro`
- `Main`
- `Profile` - `MemberButton`
- `ProfileDetail`
- `Photocard`
  - `PhotocardSave`
  - `PhotocardImg`
  - `PhotocardExample`
  - `PhotocardFooter`
  - `PhotocardPanel`
    - `PanelButtons`
    - `MemberPanel`
    - `FramePanel`
    - `StickerPanel`
    - `BrushPanel`
      - `UndoRedo`
      - `BrushSize`
      - `BrushType`
    - `ErrorPage`
- `Loading`
- `MyRoom`
  - `Character` - `Help`
  - `SpeechBubble` - `Help`
  - `HeartBar`
  - `StatusBar` - `Help`
  - `MyRoomModal` 
- `PlayList`
  - `Frequency`
  - `ProgressBar`
  - `LikeMusic`
  - `TrackList` - `ListButtons`
- `Back`

<br>

### 5.2. 기여자

- 프론트엔드(Front-end): 정채빈
- 디자이너(Designer): 김다은
