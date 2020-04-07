$('#btnGo').on('click',()=>{
    console.log(`btn clicked`);

    const bb=$('#barsBack').val();
    const mm=$('#mainSymbol').val();
    
    const barsBack=bb!=''?bb:'200';
    const mainSymbol=mm!=''?mm:'aapl';
    
    const last=barsBack;
    const stock=mainSymbol;
    const table_url=`https://cloud.iexapis.com/stable/stock/${stock}/intraday-prices?token=pk_259b5a7a74a84ae78c1c3cc4b30c52ef&chartLast=${last}`;
    $.ajax({
	url:table_url,
	method:'GET',
	success:function(resp){
	    //$('#barsBack').val(barsBack);
	    //let dx=JSON.parse(resp);
	    console.table(resp);
	    const datax=resp.map(x=>({
		'time':x.date,
		'value':x.close,
	    }));
	    console.log(datax);

	    let d='';
	    d+='<table border="1" style="border-collapse:collapse;width:100%">';
	    d+='<tr><td>#</td><td>date</td><td>minute</td><td>close</td></tr>';
	    d+=resp.map((x,index)=>(
		`<tr><td>${index+1}</td><td>${x.date}</td><td>${x.minute}</td><td>${x.close}</td></tr>`
	    ));
	    d+='</table>';
	    //console.log(d);
	    
	    $('#result').html(d);

	    //
	    const chart = LightweightCharts.createChart(document.body, { width: 400, height: 300 });
	    const lineSeries = chart.addLineSeries();
	    lineSeries.setData(datax);
	    //

	    
	    //$('#id_tbody').html(div);
	},
	error:function(xhr,status,error){
	    console.log('getting data error');
	}    
    });

    
});



