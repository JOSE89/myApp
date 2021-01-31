import React, {memo, useCallback, useMemo } from 'react';
import {useDispatch} from 'react-redux';
import classNames from 'classnames';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import PropTypes from 'prop-types';
import { createNewFootballGameAction } from '../store/actions/refreshPanelActions';
import { InputText } from 'primereact/inputtext';
import {toast} from 'react-toastify';

const NewSoccerDialog = ({soccer, setProduct, productDialog, submitted, setSubmitted, onInputChange, setProductDialog}) => {

  const dispath = useDispatch();

  const hideDialog = useCallback(() => {
    setSubmitted(false);
    setProductDialog(false);
    }, [setProductDialog, setSubmitted]);

  const saveProduct = useCallback(() => {
    setSubmitted(true);
    if (soccer?.home.trim()) {
        dispath(createNewFootballGameAction(soccer?.home, soccer?.visit));
        toast.success('Created succesfully');
        setProduct(null);
        setProductDialog(false);
        }
    }, [dispath, setProduct, setProductDialog, setSubmitted, soccer?.home, soccer?.visit]);


  const productDialogFooter = useMemo(() => (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </React.Fragment>
    ), [hideDialog, saveProduct]);

    return(
        <Dialog visible={productDialog} 
        style={{ width: '450px' }}
        header="New soccer match"
        modal
        className="p-fluid"
        footer={productDialogFooter} 
        onHide={hideDialog}>
            <div className="p-field">
                <label htmlFor="home">Home</label>
                <InputText id="home" value={soccer?.home} onChange={(e) => onInputChange(e, 'home')}
                required autoFocus 
                className={classNames({ 'p-invalid': submitted && !soccer?.home })} 
                />
                {submitted && !soccer?.home && <small className="p-error">Home is required.</small>}
            </div>
            <div className="p-field">
                <label htmlFor="visit">Visit</label>
                <InputText id="visit" value={soccer?.visit} onChange={(e) => onInputChange(e, 'visit')}
                required autoFocus 
                className={classNames({ 'p-invalid': submitted && !soccer?.visit })} 
                />
            </div>
        </Dialog>
);
}

NewSoccerDialog.protoTypes = {
    soccer: PropTypes.object,
    productDialog: PropTypes.object,
    setProduct: PropTypes.func,
    submitted: PropTypes.func,
    setSubmitted: PropTypes.func,
    onInputChange: PropTypes.func,
    setProductDialog: PropTypes.func
};

export default memo(NewSoccerDialog);