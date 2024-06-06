import { useRef, useState, FormEvent } from 'react';

import { ArrowButton } from '../arrow-button';
import { Button } from '../button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Text } from '../text';
import { Separator } from '../separator';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

import clsx from 'clsx';
import {
	fontFamilyOptions,
	fontSizeOptions,
	contentWidthArr,
	backgroundColors,
	fontColors,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	pageOptions: ArticleStateType;
	setOptions: (options: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	pageOptions,
	setOptions,
}: ArticleParamsFormProps) => {
	const [fontFamilySelected, setFontFamily] = useState(
		pageOptions.fontFamilyOption
	);

	const [fontSizeSelected, setFontSize] = useState(pageOptions.fontSizeOption);

	const [fontColorSelected, setFontColor] = useState(pageOptions.fontColor);

	const [backgroundColorSelected, setBackground] = useState(
		pageOptions.backgroundColor
	);

	const [contentWidthSelected, setContentWidth] = useState(
		pageOptions.contentWidth
	);

	const rootRef = useRef<HTMLElement | null>(null);

	const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

	//открытие и закрытие формы
	const menuOpenHandler = () => {
		setMenuOpen(!isMenuOpen);
	};

	//применение опций
	const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setOptions({
			fontFamilyOption: fontFamilySelected,
			fontColor: fontColorSelected,
			backgroundColor: backgroundColorSelected,
			contentWidth: contentWidthSelected,
			fontSizeOption: fontSizeSelected,
		});
	};

	//сброс опций
	const formResetHandler = () => {
		setOptions({
			...defaultArticleState,
		});
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontColor(defaultArticleState.fontColor);
		setBackground(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setFontSize(defaultArticleState.fontSizeOption);
	};

	//закрытие формы при клике вне формы
	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: rootRef,
		onClose: menuOpenHandler,
		onChange: setMenuOpen,
	});

	return (
		<>
			<ArrowButton onClick={menuOpenHandler} isOpen={isMenuOpen} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form
					onSubmit={formSubmitHandler}
					onReset={formResetHandler}
					className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={fontFamilySelected}
						onChange={setFontFamily}
					/>
					<RadioGroup
						title='Размер шрифта'
						options={fontSizeOptions}
						name='fontSize'
						selected={fontSizeSelected}
						onChange={setFontSize}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={fontColorSelected}
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={backgroundColorSelected}
						onChange={setBackground}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={contentWidthSelected}
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
