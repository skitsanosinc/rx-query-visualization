import {Avatar, Card, Col, Divider, Input, Row} from 'antd';
import {useState} from 'react';

const rx = /(((?<logic>\w+)\s)?(?<key>\w+))(?<operation>[=~?><])(?<value>"?[^\s]*"?)/gui;

const collectFilters = q => [...q.matchAll(rx)].map(el => el?.groups);

const preProcessFilters = f =>
{
	return f.map(filter =>
	{
		const {logic, key, operation, value} = filter;

		let _value = null;

		//Check booleans
		if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')
		{
			_value = Boolean(value);

			//only logic operations allowed on booleans
			if (!['=', '~'].includes(operation))
			{
				return {};
			}
		}

		if (value.toString().length === 0)
		{
			_value = null;
		}

		//Check numbers
		if (!isNaN(value) && value.toString().length !== 0)
		{
			_value = Number(value);
		}

		//Check strings
		if (isNaN(value) && value.toString().length !== 0)
		{
			_value = value.replaceAll(/^"|"$/gi, '');
		}

		return {
			logic,
			key,
			operation,
			value: _value
		};
	});
};

const operationToString = op =>
{
	switch (op)
	{
		case '=':
			return 'EQUAL';

		case '~':
			return 'NOT EQUAL';

		case '?':
			return 'LIKE';

		case '>':
			return 'MORE THAN';

		case '<':
			return 'LESS THAN';

	}
};

const page = () =>
{
	const [query, setQuery] = useState();

	const onChange = e =>
	{
		const {value} = e.target;

		const filters = collectFilters(value);
		const filterBlocks = preProcessFilters(filters);

		setQuery(filterBlocks);
	};

	return <div>
		<h1>Query Visualisation Demo</h1>
		<div className={'mb-xxl'}>
			Sources are available on:<br/>
			<a href={'https://github.com/skitsanosinc/rx-query-visualization'}
			   target={'_blank'}>https://github.com/skitsanosinc/rx-query-visualization</a>
		</div>

		<Divider/>

		<Card className={'mb-xxl'}>
			<div className={'mb-xxl'}>
				<div>
					Query operations supported:
				</div>
				<div>
					= (equal), ~ (not equal), ? (like), &gt; (greater than), &lt; (less than)
				</div>
			</div>

			<Divider/>

			<div>
				Query Example: <code>debug=true AND email?something.com</code>
			</div>

			<Divider/>

			<h2>Query:</h2>

			<Input placeholder={'Type here..'}
				   onChange={onChange}/>
		</Card>

		<Card>
			<h2>Parsed Query Blocks</h2>
			{query?.map((el, index) => <Card.Grid style={{width: '25%'}}
												  key={index}>
				<Row>
					<Col>
						<Avatar size={64}>{el.logic && el.logic.toUpperCase()}</Avatar>
					</Col>

					<Col className={'condition-details'}>
						{el.key} {operationToString(el.operation)} {el.value}
					</Col>
				</Row>
			</Card.Grid>)}
		</Card>
	</div>;
};

export default page;