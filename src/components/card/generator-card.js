import React, { useState } from 'react';
import CodeSnippnets from 'components/snippet';
import PropTypes from 'prop-types';

import { rgbToHex } from 'utils';
import { BorderWrap, GenerateWrapper } from './style';

import { ReactComponent as Love } from '../../assets/icons/icon-love.svg';
import { ReactComponent as Code } from '../../assets/icons/icon-code.svg';
import { ReactComponent as ArrowRight } from '../../assets/icons/icon-right.svg';
import { ReactComponent as Save } from '../../assets/icons/icon-save.svg';

const GeneratorCard = ({
	children,
	copyText,
	data,
	loved,
	saveGradient,
	url,
	next,
	prev,
}) => {
	const [viewCode, setViewCode] = useState(false);
	return (
		<>
			<GenerateWrapper
				style={{
					background: data.color,
				}}
				color={{
					one: rgbToHex(data.color, 1),
					two: rgbToHex(data.color, 0),
				}}
				className="fadeIn"
			>
				{children}
				{viewCode && (
					<CodeSnippnets
						data={data}
						setViewCode={setViewCode}
						copyText={copyText}
					/>
				)}

				<div className="write__up">
					<article>
						<h4>{data.name}</h4>
						<p className="hex__section">
							<span>{rgbToHex(data.color, 1)}</span> <ArrowRight />{' '}
							<span>{rgbToHex(data.color, 0)}</span>
						</p>{' '}
						<div
							className="small__colors"
							style={{
								background: `${rgbToHex(data.color, 1)}`,
							}}
						/>
						<div
							className="small__colors"
							style={{
								background: `${rgbToHex(data.color, 0)}`,
							}}
						/>
					</article>

					<div className="control__panel">
						<h6>Tap space bar to generate new gradients</h6>
						<div className="d-flex justify-content-between">
							<span onClick={prev}>
								<ArrowRight style={{ transform: 'rotate(180deg)' }} /> Previous
							</span>
							<span onClick={next}>
								Next <ArrowRight />
							</span>
						</div>
					</div>

					<BorderWrap className="float-right border-wrap">
						<Code
							className="mr-2"
							onClick={() => {
								setViewCode(true);
								copyText();
							}}
						/>
						<a download={`Pigment-${data.name}`} href={url} title={data.name}>
							<Save />
						</a>

						<Love
							onClick={() => saveGradient(data)}
							className={`${loved && 'active_love'} ml-2`}
						/>
					</BorderWrap>
				</div>
			</GenerateWrapper>
		</>
	);
};

GeneratorCard.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
	copyText: PropTypes.func,
	data: PropTypes.object,
	loved: PropTypes.bool,
	saveGradient: PropTypes.func,
	url: PropTypes.string,
	next: PropTypes.func,
	prev: PropTypes.func,
};

export default GeneratorCard;