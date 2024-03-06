import { message } from 'antd'

const successMsg = ({msg}) => {

    const showSuccess = (successMsg) => {
        message.success({
          content: successMsg,
          duration: 5,
          style: {
              fontSize: '1.5rem'
          },
        })
    }

    return(
        showSuccess(msg)
    )
}

export default successMsg