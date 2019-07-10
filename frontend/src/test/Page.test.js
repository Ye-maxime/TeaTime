import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import {Account} from "../pages/bundle";

Enzyme.configure({adapter: new Adapter()});

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