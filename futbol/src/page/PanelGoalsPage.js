import React, {memo, useCallback, useState, useMemo, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {createNewFootballGameAction, updatePanelAction} from '../store/actions/refreshPanelActions';
import {InputText} from 'primereact/inputtext';
import {getResults} from '../store/selectors/SoccerResults';

const PanelGoalsPage = () => {
  const dispath = useDispatch();
  const [products, setProducts] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [home, setHome] = useState('');
  const [wait, setWait] = useState('');
  const [resultHome, setResultHome] = useState('');
  const [resultWait, setResultWait] = useState('');

  const results = useSelector(getResults);

  useEffect(() => {
    if (results?.length > 0) {
      setProducts(results);
    }
  }, [results]);

  const columns = [
    {field: 'home', header: 'Home'},
    {field: 'away', header: 'Away'},
    {field: 'homeGoals', header: 'Goals H'},
    {field: 'awayGoals', header: 'Goals A'}

  ];

  const dynamicColumns = columns.map((col, i) => <Column key={col.field} field={col.field} header={col.header} />);

  const handleNewFootballGame = useCallback(() => {
    setShowDialog(true);
  }, []);

  const handleUpdateResults = useCallback(() => {
    dispath(updatePanelAction());
  }, [dispath]);

  const handleDeleteResult = useCallback(() => {
    console.log('delete');
  }, []);

  const newSoccerGame = useCallback(() => {
    dispath(createNewFootballGameAction(home, wait));
    setHome('');
    setWait('');
  }, [dispath, home, wait]);

  const closeDialog = useCallback(() => {
    setShowDialog(false);
  }, []);


  const renderFooter = useMemo(() => (
    <div>
      <Button label="No" icon="pi pi-times" onClick={closeDialog} className="p-button-text" />
      <Button label="Yes" icon="pi pi-check" onClick={newSoccerGame} autoFocus />
    </div>
  ), [closeDialog, newSoccerGame]);

  const handleChange = useCallback(e => {
    switch (e?.target?.name) {
      case 'home':
        setHome(e.target.value);
        break;
      case 'wait':
        setWait(e.target.value);
        break;
      case 'resultHome':
        setResultHome(e.targe.value);
        break;
      case 'resultWait':
        setResultWait(e.target.value);
        break;
      default:
        return null;
    } return null;
  }, []);

  const renderDialog = useMemo(() => (
    <React.Fragment>
      <div className= 'p.dialog'>
        <div className= 'card'>
          <Dialog header="Creat new game"
            footer={renderFooter}
            visible={showDialog}
            style={{width: '30vw'}}
            modal
            onHide={closeDialog}>
            <div content-section implementation>
              <div className="card">
                <div className="p-field">
                  <label htmlFor="home">Home</label>
                  <InputText onChange = {handleChange} value = {home} autoComplete='off' name= 'home' id= 'home' />
                </div>

                <div p-col-12>
                  <span className="p-float-label">
                    <label htmlFor="wait">Wait</label>
                    <InputText label={'Wait'} onChange = {handleChange} value = {wait} autoComplete='off' name= 'wait' id= 'wait'/>
                  </span>
                </div>
              </div>
            </div>
          </Dialog>
          <div className={'p-component-overlay.p-sidebar-mask.level2'} />
        </div>
      </div>
    </React.Fragment>
  ), [closeDialog, handleChange, home, renderFooter, showDialog, wait]);

  const renderButtons = useCallback(() => (
    <div className= {'p-col-12'}>
      <Button label="New" onClick={handleNewFootballGame} className={'p-button-success'} icon="pi pi-check" />
      <Button label="Update" onClick={handleUpdateResults} className={'p-button-info'} icon="pi pi-check" iconPos="right" />
      <Button label= "Delete" onClick={handleDeleteResult} icon={'pi pi-trash'} iconPos="right" />
    </div>
  ), [handleDeleteResult, handleNewFootballGame, handleUpdateResults]);

  return <div>
    {renderButtons()}
    <div className= {'p-col-12'}>
      <DataTable value={products}>
        {dynamicColumns}
      </DataTable>
    </div>
    <div className= {'p-col-3'}>
      {showDialog && renderDialog}
    </div>
  </div>;
};
export default memo(PanelGoalsPage);
