module.exports = {
    setupFiles: ['<rootDir>/config/enzyme.config.js'], // The paths to modules that run some code to configure or set up the testing environment before each test
    testMatch: ['<rootDir>/src/test/**/*.(spec|test).js?(x)'], // 用来匹配test文件夹下的所有test文件
    verbose: true,
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': '<rootDir>/src/mock/styleMock.js',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/mock/fileMock.js',
    },
    transform: {
        '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    },
};
