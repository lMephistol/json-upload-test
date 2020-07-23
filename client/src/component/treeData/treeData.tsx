import React, {FC, useState} from 'react';
import styled from 'styled-components';
import DescriptionIcon from '@material-ui/icons/Description';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const StyledElement = styled.div`
  padding-left: 120px;
  display: flex;
  align-items: center;
  span {
    margin-left: 5px;
  }
`;

const Element = ({name} : any): any => {

  return (
      <StyledElement>
        <DescriptionIcon />
        <span>{name}</span>
      </StyledElement>
  );
}

const StyledFolder = styled.div`
  padding-left: 20px;

  .folder--label {
    display: flex;
    align-items: center;
    span {
      margin-left: 5px;
    }
  }
`;

const Folder = ({name, children}: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (event : React.MouseEvent) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
      <StyledFolder>
        {isOpen ?  <RemoveCircleIcon onClick={handleToggle} /> : <AddCircleIcon onClick={handleToggle} />}
          <span>{name}</span>
        <Collapsible isOpen={isOpen}>{children}</Collapsible>
      </StyledFolder>
  );
};
interface CollapsibleProps {
  isOpen: boolean
}
const Collapsible = styled.div`
  height: ${(p:CollapsibleProps) => (p.isOpen ? "auto" : "0")};
  overflow: hidden;
`;

interface TreeDataProps{
  title: string;
  nodes: Array<TreeDataProps>;
}
interface Props {
  data: Array<TreeDataProps>
}

const TreeData: FC<Props> = ({data}) : any => {
  return data.map(item => {
    if (item.nodes && item.nodes.length) {
      return (
          <Folder name={item.title}>
            <TreeData data={item.nodes} />
          </Folder>
      );
    } else {
      return <Element name={item.title}/>;
    }
  });
};

export default TreeData;