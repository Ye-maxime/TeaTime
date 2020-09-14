module.exports = {
    // 为我们提供运行环境，一个环境定义了一组预定义的全局变量
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true
    },
    // 一个配置文件可以被基础配置中的已启用的规则继承。
    "extends": [
        "airbnb"
    ],
    // 自定义全局变量
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "_": true,
        "$": true,
    },
    // ESLint 默认使用Espree作为其解析器，你可以在配置文件中指定一个不同的解析器
    // "parser": "@typescript-eslint/parser",
    "parser": "babel-eslint",
    // 配置解析器支持的语法
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    // ESLint 支持使用第三方插件。在使用插件之前，你必须使用 npm 安装它。
    // 在配置文件里配置插件时，可以使用 plugins 关键字来存放插件名字的列表。插件名称可以省略 eslint-plugin- 前缀。
    "plugins": [
        "react",
        "jest"
        // "@typescript-eslint"
    ],
    // ESLint 附带有大量的规则。你可以使用注释或配置文件修改你项目中要使用的规则。要改变一个规则设置，你必须将规则 ID 设置为下列值之一：
    // "off" 或 0 - 关闭规则
    // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
    // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
    "rules": {
        semi: 0,
        'no-unused-vars': [
            1,
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: true,
                varsIgnorePattern: '^_',
                argsIgnorePattern: '^_|^err|^ev' // _xxx, err, error, ev, event
            }
        ],
        'no-useless-escape': 2,
        "no-plusplus": 0,
        "no-await-in-loop": 0,
        "indent": [2, 4],
        "no-shadow": 0,
        // React相关
        "jsx-quotes": [2, "prefer-double"], //强制在JSX属性（jsx-quotes）中一致使用双引号
        "react/display-name": 0, //防止在React组件定义中丢失displayName
        "react/forbid-prop-types": [2, { "forbid": ["any"] }], //禁止某些propTypes
        "react/jsx-boolean-value": 2, //在JSX中强制布尔属性符号
        "react/jsx-closing-bracket-location": 1, //在JSX中验证右括号位置
        "react/jsx-curly-spacing": [2, { "when": "never", "children": true }], //在JSX属性和表达式中加强或禁止大括号内的空格。
        "react/jsx-indent": 0,
        "react/jsx-indent-props": [2, 4], //验证JSX中的props缩进
        "react/jsx-key": 2, //在数组或迭代器中验证JSX具有key属性
        "react/jsx-no-bind": 0, //JSX中不允许使用箭头函数和bind
        "react/jsx-no-duplicate-props": 2, //防止在JSX中重复的props
        "react/jsx-no-literals": 0, //防止使用未包装的JSX字符串
        "react/jsx-no-undef": 1, //在JSX中禁止未声明的变量
        "react/jsx-pascal-case": 0, //为用户定义的JSX组件强制使用PascalCase
        "react/jsx-uses-react": 1, //防止反应被错误地标记为未使用
        "react/jsx-uses-vars": 2, //防止在JSX中使用的变量被错误地标记为未使用
        "react/no-danger": 0, //防止使用危险的JSX属性
        "react/no-did-mount-set-state": 0, //防止在componentDidMount中使用setState
        "react/no-did-update-set-state": 1, //防止在componentDidUpdate中使用setState
        "react/no-direct-mutation-state": 2, //防止this.state的直接变异
        "react/no-multi-comp": 1, //防止每个文件有多个组件定义
        "react/no-set-state": 0, //防止使用setState
        "react/no-unknown-property": 2, //防止使用未知的DOM属性
        "react/prefer-es6-class": 2, //为React组件强制执行ES5或ES6类
        "react/prop-types": 0, //防止在React组件定义中丢失props验证
        "react/react-in-jsx-scope": 2, //使用JSX时防止丢失React
        "react/self-closing-comp": 0, //防止没有children的组件的额外结束标签
        "react/sort-comp": 1, //强制组件方法顺序
        "no-extra-boolean-cast": 0, //禁止不必要的bool转换
        "react/no-array-index-key": 0, //防止在数组中遍历中使用数组key做索引
        "react/no-deprecated": 1, //不使用弃用的方法
        "react/jsx-equals-spacing": 2, //在JSX属性中强制或禁止等号周围的空格
        "no-unreachable": 1, //不能有无法执行的代码
        "comma-dangle": 2, // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号
        "comma-spacing": [2, { 'before': false, 'after': true }],  // 控制逗号前后的空格
        "no-mixed-spaces-and-tabs": 0, //禁止混用tab和空格
        "prefer-arrow-callback": 0, //比较喜欢箭头回调
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/jsx-one-expression-per-line": 0,
        "react/jsx-props-no-spreading": 0,
    }
};