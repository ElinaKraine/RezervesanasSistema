import { message } from 'antd'

const errorMsg = ({msg}) => {

    const showError = (errorMsg) => {
        message.error({
          content: errorMsg,
          duration: 5,
          style: {
              fontSize: '1.5rem'
          },
        })
    }

    return(
        showError(msg)
    )
}

export default errorMsg