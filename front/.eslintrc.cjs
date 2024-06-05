module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false },
    ], // TypeScript에서 사용하지 않는 변수를 검출합니다.
    "@typescript-eslint/explicit-function-return-type": "warn",
    // 함수의 반환 타입이 추론 가능할 때도 명시적으로 타입을 선언하도록 경고합니다.

    "no-empty": "warn", // 빈 블록문에 대한 경고 설정

    semi: ["error", "always"], // 세미콜론(;) 사용 강제 설정
  },
}
