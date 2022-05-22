/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { TModalProps, TModalState } from './Modal.types';
import styles from './Modal.module.scss';

class Modal extends Component<TModalProps, TModalState> {
  modalRoot = document.createElement('div');

  constructor(props: TModalProps) {
    super(props);

    this.state = {};

    this.modalRoot.classList.add(styles.root);
    this.toggleVisibility(props.show);
  }

  static getDerivedStateFromProps(props: TModalProps, state: TModalState) {
    return {
      content: props.show ? props.children : state.content,
    };
  }

  componentDidMount() {
    document.body.appendChild(this.modalRoot);
  }

  componentDidUpdate() {
    const { show } = this.props;
    this.toggleVisibility(show);
  }

  componentWillUnmount() {
    document.body.removeChild(this.modalRoot);
  }

  toggleVisibility(isShown: boolean) {
    this.modalRoot.classList.toggle(styles.show, isShown);
  }

  render() {
    const { content } = this.state;
    const { onRequestClose } = this.props;

    return createPortal(
      <>
        <div className={styles.backdrop} onClick={onRequestClose} />
        <div className={styles.container}>{content}</div>
      </>,
      this.modalRoot
    );
  }
}

export { Modal };
