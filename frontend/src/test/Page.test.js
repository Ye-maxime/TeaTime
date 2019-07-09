import React from "react";
import {shallow} from "enzyme";
import {Account} from "../pages/bundle";

describe("Account page", () => {
    it("renders", () => {
        const wrapper = shallow(<Account/>);
        expect(wrapper.exists()).toBe(true)
    });
});

// describe("Menu page", () => {
//     it("renders", () => {
//         const wrapper = shallow(<Menu/>);
//         expect(wrapper.exists()).toBe(true)
//     });
// });