import React from "react";
import Enzyme, {shallow, mount} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import {Account} from "../pages/bundle";


Enzyme.configure({adapter: new Adapter()});

describe("Account page", () => {
    test("renders", () => {
        const wrapper = shallow(<Account/>);
        expect(wrapper.exists()).toBe(true)
    });


    test("click left side bar is echoed", ()=> {
        const wrapper = mount(<Account/>);
        wrapper.find('LeftSideBar').find('TabItem').last().simulate('click');
        expect(wrapper.state().tabSelectedId).toBe(4);
    })
});

// describe("Menu page", () => {
//     it("renders", () => {
//         const wrapper = shallow(<Menu/>);
//         expect(wrapper.exists()).toBe(true)
//     });
// });