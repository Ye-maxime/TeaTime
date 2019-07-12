import React from "react";
import Enzyme, {shallow, mount} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import {Account, Menu, Store, ShoppingCart, Home} from "../pages/bundle";
import MenuList from '../components/MenuList';
import configureStore  from "redux-mock-store";

Enzyme.configure({adapter: new Adapter()});
const mockStore = configureStore();

describe("Account page", () => {
    test("renders", () => {
        const wrapper = shallow(<Account/>);
        expect(wrapper.exists()).toBe(true)
    });


    test("click left side bar is echoed", () => {
        const wrapper = mount(<Account/>);
        wrapper.find('LeftSideBar').find('TabItem').last().simulate('click');
        expect(wrapper.state().tabSelectedId).toBe(4);
    })
});

describe("Menu page", () => {
    it("renders", () => {
        const wrapper = shallow(<Menu/>);
        expect(wrapper.exists()).toBe(true)
    });
});

describe("Store page", () => {
    it("renders", () => {
        const wrapper = shallow(<Store/>);
        expect(wrapper.exists()).toBe(true)
    });
});

describe("Home page", () => {
    it("renders", () => {
        const wrapper = shallow(<Home/>);
        expect(wrapper.exists()).toBe(true)
    });
});

describe("ShoppingCart page", () => {
    it("renders", () => {
        const wrapper = shallow(<ShoppingCart/>);
        expect(wrapper.exists()).toBe(true)
    });
});

describe("MenuList", () => {
    const mockStore = configureMockStore();
    let wrapper, store;

    const drink1 =  {
        collection:'BROWN',
        name:'first drink brown',
        price: 12,
        id:1
    }
    const drink2 = {
        collection:'LULU',
        name:'second drink brown',
        price: 12,
        id:2
    }
    function prepareForTestWhenIsLoaded(){
        const initialState = {
            drinks: {
                items: [ drink1, drink2 ]
            },
            isLoading: false
        };
        store = mockStore(initialState);
        // Shallow render the container passing in the mock store
        wrapper = mount(
            <MenuList store={store} />
        );
    }
    function prepareForTestWhenIsNotLoaded(){
        const initialState = {
            drinks: {
                items: [ drink1, drink2 ],
                loading: true
            },
        };
        store = mockStore(initialState);
        wrapper = mount(
            <MenuList store={store}/>
        );
    }

    it('should show drink props', () => {
        prepareForTestWhenIsLoaded();
        expect(wrapper.find("MenuList").props().drinks.length).toBe(2);
    });

    it('should add drink to shopping cart for brown drinks', () => {
        prepareForTestWhenIsLoaded();
        wrapper.find(".addIcon").first().simulate("click")
        const actions = store.getActions();
        expect(actions[1].type).toBe('ADD_TO_SHOPPING_CART')
    });

    it('should add drink to shopping cart for lulu drinks', () => {
        prepareForTestWhenIsLoaded();
        wrapper.find(".addIcon").last().simulate("click");
        const actions = store.getActions();
        expect(actions[1].type).toBe('ADD_TO_SHOPPING_CART');
    });

    it('should not show page when not loading elements', () => {
        prepareForTestWhenIsNotLoaded();
        expect(wrapper.find(".spinner-border").exists()).toBe(true)
    });
});
