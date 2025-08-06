# Admin Dashboard Project

Next.js 15 기반의 관리자 대시보드 애플리케이션입니다.

## 🚀 기술 스택

- **Next.js 15** (App Router)
- **React 19** + **TypeScript**
- **NextAuth.js** (인증)
- **Tailwind CSS** + **Radix UI**
- **Zustand** (상태 관리)
- **React Hook Form** + **Zod**

## 📦 설치 및 실행

### 필수 요구사항

- Node.js 22 이상
- Yarn 1.22 이상

### 설치

```bash
# 의존성 설치
yarn install

# 환경 변수 설정
cp .env.example .env.local
# .env.local 파일을 편집하여 실제 값으로 변경
```

### 개발 서버 실행

```bash
yarn dev
```

브라우저에서 [http://localhost:4200](http://localhost:4200)을 열어 확인하세요.

## 🛠️ 사용 가능한 스크립트

```bash
# 개발 서버 실행
yarn dev

# 프로덕션 빌드
yarn build

# 프로덕션 서버 실행
yarn start

# 린팅 검사
yarn lint

# 타입 체크
yarn type-check

# 코드 포맷팅
yarn format

# 포맷팅 검사
yarn format:check
```

## 📁 프로젝트 구조

```
├── app/                    # Next.js App Router 페이지
│   ├── dashboard/         # 대시보드
│   ├── user-management/   # 사용자 관리
│   ├── partner-management/# 파트너 관리
│   ├── system-management/ # 시스템 관리
│   └── menu-management/   # 메뉴 관리
├── components/            # 재사용 가능한 컴포넌트
├── lib/                   # 유틸리티 함수
├── hooks/                 # 커스텀 훅
├── store/                 # Zustand 스토어
├── types/                 # TypeScript 타입 정의
└── context/               # React Context
```

## 🔐 보안 기능

- **Rate Limiting**: 브루트 포스 공격 방지
- **JWT 토큰 검증**: 클라이언트/서버 사이드 검증
- **세션 관리**: NextAuth.js 기반 안전한 세션
- **환경 변수 보호**: 민감한 정보 분리

## 🎨 코드 스타일

- **Prettier**: 코드 포맷팅
- **ESLint**: 코드 품질 검사
- **TypeScript**: 타입 안전성

## 📝 개발 가이드

### 새로운 페이지 추가

1. `app/` 폴더에 새 디렉토리 생성
2. `page.tsx` 파일 생성
3. 메뉴 데이터에 경로 추가

### 새로운 컴포넌트 추가

1. `components/` 폴더에 컴포넌트 생성
2. TypeScript 인터페이스 정의
3. 재사용 가능하도록 설계

## 🚨 문제 해결

### 일반적인 문제들

- **포트 충돌**: 다른 포트 사용 `yarn dev -p 3000`
- **타입 에러**: `yarn type-check`로 확인
- **포맷팅 문제**: `yarn format`으로 수정

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.
