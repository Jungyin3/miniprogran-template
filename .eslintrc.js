module.exports = {
  "extends": ["taro/react"],
  "rules": {
    // 坚决不要分号
    "semi": [2, "never"],
    // 两个空格
    "indent": [2, 2, {
      "SwitchCase": 1,
      "VariableDeclarator": {
        "var": 2,
        "let": 2,
        "const": 3
      },
      "MemberExpression": 1,
      "ArrayExpression": 1,
      "ObjectExpression": 1,
    }],
    // jsx也是两个空格
    "react/jsx-indent": [2, 2],
    // jsx表达式两边留空格
    "react/jsx-equals-spacing": [2, "always"],
    // jsx表达式两边留空格
    "react/jsx-curly-spacing": [2, {
      "when": "always"
    }],
    // 单引号
    "quotes": [2, "single"],
    "@typescript-eslint/no-shadow": 0,
    "react-hooks/exhaustive-deps": 0
  }
}
