const BootstrapContainer = ({ children, bootstrapGrid }) => {
	if(bootstrapGrid){
		return <div className='container'>{children}</div>
	} else {
		return children
	}
}
const BootstrapRow = ({ children, bootstrapGrid }) => {
	if(bootstrapGrid){
		return <div className='row'>
			{children}
		</div>
	} else {
		return children
	}
}
const BootstrapCol = ({ children, bootstrapGrid }) => {
	if(bootstrapGrid){
		return <div className='col'>
			{children}
		</div>
	} else {
		return children
	}
}














let coversArr = (trueIteration, fullForm, activeIteration, nameInput, product) => {
	if(trueIteration === activeIteration){
		return Object.keys(fullForm).map(inp => {
			return <div className="c__input d-inline-block mt-2">
				{inp === Object.keys(fullForm)[0]
					? <input id={`${product}-${nameInput}-${inp}`} type="radio" name={nameInput} value={inp} checked/>
					: <input id={`${product}-${nameInput}-${inp}`} type="radio" name={nameInput} value={inp}/>
				}
				<label for={`${product}-${nameInput}-${inp}`}>{inp}</label>
			</div>
		})
	} else {
		activeIteration++;
		return coversArr(trueIteration, fullForm[Object.keys(fullForm)[0]], activeIteration, nameInput, product)
	}
}

const BuildFormInputRadio = ( fullForm, formParameters, product ) => {
	return formParameters.sequence.map((nameInput,index)=>{
		let activeIteration = 0;
		return <div className="col-12 form-group castom_input">
			<div className="font-weight-bold">{formParameters.formTitle[nameInput]}</div>
			{coversArr(index, fullForm, activeIteration, nameInput, product)}
		</div>
	})
}

const BuildSectionCalc = ({ dataItems, maxColToRow }) => {
	return Object.keys(dataItems).map( product => {
		return <div className="col-md col-12 my-3" style={{minWidth: Math.round(100/maxColToRow)+'%'}}>
			<div className="section-catalog__cart-product">
				<form className="has-calculator text-center">
					<div className="has-calculator__taitl">{dataItems[product].productName}</div>
					<img src={dataItems[product].productImg} alt={dataItems[product].productName} className="img-fluid"/>
					<input type="hidden" name="form" value="Карточка товара"/>
					<input type="hidden" name="product" value={product}/>
					<input type="hidden" name="data" 
						data-datasequence={JSON.stringify(dataItems[product].formParameters.sequence)} 
						data-hasdata={JSON.stringify(dataItems[product].form)}
					/>
					<div className="col-12 text-center p-3 bg-white">
						{BuildFormInputRadio(dataItems[product].form, dataItems[product].formParameters, product)}
						<div className="col-12 pl-4">
							<s><p className="jPriceOld" data-animation="animated tada delay-1s">0</p></s>
							<p className="h3 text-red jPrice" data-animation="animated tada delay-1s">0 руб.</p>
						</div>
						<div className="col-12">
							<div className="my-3">
								<button type="button"
									className="btn btn-warning btn-block btn-lg shadow transition--slide"
									data-toggle="modal" data-target="#modal-order">Заказать</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	})
}

export const Card = {
	BootstrapContainer: BootstrapContainer,
	BootstrapRow: BootstrapRow,
	BootstrapCol: BootstrapCol,
	BuildSectionCalc: BuildSectionCalc,
}