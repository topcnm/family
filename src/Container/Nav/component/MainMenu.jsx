import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classnameCreator from 'classnames';
import { Icon } from 'antd';
import _ from 'lodash';

import './mm.scss';

const MainMenu = (props) => {
  const { data } = props;
  return (
    <ul className="main-menu">
      {
        _.map(data, (l1menu, index) => {
          const { children, zhName } = l1menu;
          const textClass = classnameCreator({
            'main-menu-li-text': true,
            'main-menu-li-text-tri': !!children.length,
          });
          return (
            <li className="main-menu-l1" key={`${index}-mml1`}>
              <span className={textClass}>
                <Link to={l1menu.url}>{ zhName }</Link>
                { !!children.length && <Icon type="down" />}
              </span>
              { !!children.length && <SubMenu subItems={children} /> }
            </li>
          );
        })
      }
    </ul>);
};

MainMenu.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

MainMenu.defaultProps = {
  data: [],
};

const SubMenu = (props) => {
  const { subItems } = props;
  return (
    <div className="sub-menu">
      { _.map(subItems, (item, idx) => (<Link key={`${idx}-sml2`} to={item.url}>{item.zhName}</Link>))}
    </div>);
};

SubMenu.propTypes = {
  subItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MainMenu;
