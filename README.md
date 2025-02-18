# Medical Streaming App

의료영상 스트리밍 및 녹화 기능을 제공하는 모바일 앱

## 개발 환경 설정

### 필수 요구사항

- Node.js v18 이상
- Java Development Kit (JDK) 11 이상
- Android Studio 및 Android SDK
- Git

### 설치 및 실행 방법

1 저장소 클론

```bash
git clone git@github.com:JaeHwanSim/HeadVisionMobile.git
cd HeadVisionMobile
```

2 의존성 설치

```bash
npm install
```

3 Android 개발 환경 설정

- Android Studio 설치
- ANDROID_HOME 환경 변수 설정
- Android SDK Platform 31 (또는 현재 타겟 버전) 설치
- Android SDK Build-Tools 31 설치

4 앱 빌드 및 실행

```bash
npm run android
```

5 배포용 빌드

5-1 키 저장소 생성 (아직 없는 경우)

```bash
cd android
keytool -genkeypair -v -storetype PKCS12 -keystore headvision.keystore -alias headvision-alias -keyalg RSA -keysize 2048 -validity 10000
```

5-2 키 저장소 설정

android/gradle.properties 파일 수정

```box
MYAPP_RELEASE_STORE_FILE=headvision.keystore
MYAPP_RELEASE_KEY_ALIAS=headvision-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

5-3 서명 설정

android/app/build.gradle에 다음 내용 추가:

```code
android {
    ...
    signingConfigs {
        release {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
```

5-4 빌드 명령

```bash
cd android
./gradlew assembleRelease
```

6 Android 빌드 문제 해결

```bash
# 안드로이드 빌드 캐시 정리
cd android
./gradlew clean

# Gradle 캐시 삭제
cd android
rm -rf .gradle

# node_modules 재설치
npm install

# Metro 캐시 정리
npm start -- --reset-cache
```

7 Metro 캐시 정리

```bash
npm start -- --reset-cache
```

8 빌드 스크립트 추가

package.json에 편리한 빌드 스크립트 추가:

```code
{
  "scripts": {
    ...
    "android-clean": "cd android && ./gradlew clean",
    "android-build-debug": "cd android && ./gradlew assembleDebug",
    "android-build-release": "cd android && ./gradlew assembleRelease",
    "android-bundle": "cd android && ./gradlew bundleRelease"
  }
}
```

9 AAB (Android App Bundle) 생성

Google Play 스토어 배포용:

```bash
cd android
./gradlew bundleRelease
```

10 빌드 파일 위치

```box

### 빌드 파일 위치
- Debug APK: `android/app/build/outputs/apk/debug/app-debug.apk`
- Release APK: `android/app/build/outputs/apk/release/app-release.apk`
- Release Bundle: `android/app/build/outputs/bundle/release/app-release.aab`
```
