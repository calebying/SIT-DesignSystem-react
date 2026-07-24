import * as React from 'react';
import { mount } from 'enzyme';
import ThemeProvider, { createBootstrapComponent, CanvasWrapper } from '../../src/ThemeProvider/ThemeProvider';
import  { Button } from '../../src/Button';

describe('<ThemeProvider>', () => {
  const Foo = createBootstrapComponent(
    class Foo extends React.Component {
      render() {
        return (
          <p className={`${this.props.bsPrefix} ${this.props.bsPrefix}-bar`} />
        );
      }
    },
    'foo'
  );

  it('should use HOC value', () => {
    const wrapper = mount(
      <div>
        <Foo />
      </div>
    );
    expect(wrapper.find('p.foo')).toBeDefined();
  });

  it('should provide bsPrefix overrides', () => {
    const wrapper = mount(
      <ThemeProvider prefixes={{ btn: 'my-btn', foo: 'global-foo' }}>
        <div>
          <Button variant="primary">My label</Button>
          <Foo />
        </div>
      </ThemeProvider>
    );
      expect(wrapper.find('button.my-btn.my-btn-primary')).toBeDefined()
    expect(wrapper.find('p.global-foo')).toBeDefined();
  });

  it('should use prop bsPrefix first', () => {
    const wrapper = mount(
      <ThemeProvider prefixes={{ foo: 'global-foo' }}>
        <div>
          <Foo bsPrefix="my-foo" />
        </div>
      </ThemeProvider>
    );
    expect(wrapper.find('p.my-foo')).toBeDefined()
  });

  it('should forward ref', () => {
    let ref;
    const wrapper = mount(
      <div>
        <Foo bsPrefix="my-foo" ref={(r) => (ref = r)} />
      </div>
    );

    expect(ref).toEqual(wrapper.find('Foo').instance());
  });
});

describe('CanvasWrapper', ()=> {
  it('returns default div wrapper with sit-canvas className', () => {
    const wrapper = mount(<CanvasWrapper></CanvasWrapper>)
    expect(wrapper.hasClass('sit-canvas'))
    expect(wrapper.find('div').exists()).toBe(true)

  })

  it('returns a element when passed as prop', ()=> {
    const wrapper=  mount(<CanvasWrapper as="a"></CanvasWrapper>)
    expect(wrapper.find('div').exists()).toBe(false)
    expect(wrapper.find('a').exists()).toBe(true)
  })

  it('should forward refs to the component', () => {
    const ref = React.createRef();
    mount(<CanvasWrapper ref={ref} as="button"></CanvasWrapper>)
    expect(ref.current.tagName).toEqual('BUTTON')
    mount(<CanvasWrapper ref={ref} as="span"></CanvasWrapper>)
    expect(ref.current.tagName).toEqual('SPAN')
  })
})