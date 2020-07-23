import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import UploadFiles from './component/uploadFile'
import TreeData from './component/treeData'
import _ from 'lodash'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [fileInfos, setFileInfos] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          react upload json
        </p>
        <UploadFiles setUploadFile={setFileInfos} />
        {!_.isEmpty(fileInfos) && <TreeData data={[fileInfos]} /> }
      </header>
    </div>
  );
}

export default App;
