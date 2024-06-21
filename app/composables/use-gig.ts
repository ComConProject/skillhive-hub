import { boolean, number, object, string } from 'yup'
import { TermGroup } from '~/constants'

export function useGig() {
  const { t } = useI18n()
  const { fetchTerms } = useTerm()

  const deliveryTimes = shallowRef([
    {
      value: 1,
      label: `1 ${t('day')}`,
    },
    {
      value: 2,
      label: `2 ${t('day')}`,
    },
    {
      value: 3,
      label: `3 ${t('day')}`,
    },
    {
      value: 4,
      label: `4 ${t('day')}`,
    },
    {
      value: 5,
      label: `5 ${t('day')}`,
    },
    {
      value: 6,
      label: `6 ${t('day')}`,
    },
    {
      value: 7,
      label: `7 ${t('day')}`,
    },
    {
      value: 8,
      label: `8 ${t('day')}`,
    },
    {
      value: 9,
      label: `9 ${t('day')}`,
    },
    {
      value: 10,
      label: `10 ${t('day')}`,
    },
    {
      value: 14,
      label: `14 ${t('day')}`,
    },
    {
      value: 21,
      label: `21 ${t('day')}`,
    },
    {
      value: 30,
      label: `30 ${t('day')}`,
    },
    {
      value: 60,
      label: `60 ${t('day')}`,
    },
  ])
  const pagesOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const revisions = [1, 2, 3, 4, 5]

  const schema = object({
    title: string().required('Title is required'),
    description: string().required('Description is required'),
    categoryId: number().required('Category is required'),
    subCategoryId: number().required('Subcategory is required'),
    basic: object({
      title: string().required('Title is required'),
      description: string().required('Description is required'),
      deliveryTime: number().required('Delivery time is required'),
      page: number().required('Page is required'),
      customDesign: boolean().required('Custom design is required'),
      price: number().required('Price is required'),
      revisions: number().required('Revision is required'),
    }),
    standard: object({
      title: string().required('Title is required'),
      description: string().required('Description is required'),
      deliveryTime: number().required('Delivery time is required'),
      page: number().required('Page is required'),
      customDesign: boolean().required('Custom design is required'),
      price: number().required('Price is required'),
      revisions: number().required('Revision is required'),
    }),
    premium: object({
      title: string().required('Title is required'),
      description: string().required('Description is required'),
      deliveryTime: number().required('Delivery time is required'),
      page: number().required('Page is required'),
      customDesign: boolean().required('Custom design is required'),
      price: number().required('Price is required'),
      revisions: number().required('Revision is required'),
    }),
  })

  const state = useState('gig-create-state', () => ({
    categoryId: undefined,
    title: undefined,
    description: undefined,
    subCategoryId: undefined,
    basic: {
      deliveryTime: undefined,
      title: undefined,
      description: undefined,
      page: undefined,
      customDesign: undefined,
      price: undefined,
      revisions: undefined,
    },
    standard: {
      deliveryTime: undefined,
      page: undefined,
      title: undefined,
      description: undefined,
      customDesign: undefined,
      price: undefined,
      revisions: undefined,
    },
    premium: {
      deliveryTime: undefined,
      page: undefined,
      title: undefined,
      description: undefined,
      customDesign: undefined,
      price: undefined,
      revisions: undefined,
    },
  }))

  async function getTypes() {
    try {
      const types = await fetchTerms(TermGroup.PACKAGE_TYPE)

      return types
    }
    catch (error) {
      throw new Error(`[getType] ${error}`)
    }
  }

  return {
    deliveryTimes,
    pagesOptions,
    revisions,
    schema,
    state,
    getTypes,
  }
}
