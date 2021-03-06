import type { AppRouteModule } from '/@/router/types';

import { PAGE_LAYOUT_COMPONENT } from '/@/router/constant';
import { ExceptionEnum } from '/@/enums/exceptionEnum';

const ExceptionPage = () => import('/@/views/sys/exception/Exception');

export default {
  layout: {
    path: '/exception',
    name: 'ExceptionPage',
    component: PAGE_LAYOUT_COMPONENT,
    redirect: '/exception/404',
    meta: {
      icon: 'ant-design:exception-outlined',
      title: '异常页',
    },
  },

  routes: [
    {
      path: '/404',
      name: 'PageNotFound',
      component: ExceptionPage,
      props: {
        status: ExceptionEnum.PAGE_NOT_FOUND,
      },
      meta: {
        title: '404',
      },
    },
    {
      path: '/500',
      name: 'ServiceError',
      component: ExceptionPage,
      props: {
        status: ExceptionEnum.ERROR,
      },
      meta: {
        title: '500',
      },
    },
    {
      path: '/net-work-error',
      name: 'NetWorkError',
      component: ExceptionPage,
      props: {
        status: ExceptionEnum.NET_WORK_ERROR,
      },
      meta: {
        title: '网络错误',
      },
    },
    {
      path: '/page-time-out',
      name: 'PageTimeOut',
      component: ExceptionPage,
      props: {
        status: ExceptionEnum.PAGE_TIMEOUT,
      },
      meta: {
        title: '页面超时',
      },
    },
    {
      path: '/not-data',
      name: 'NotData',
      component: ExceptionPage,
      props: {
        status: ExceptionEnum.PAGE_NOT_DATA,
      },
      meta: {
        title: '无数据',
      },
    },
  ],
} as AppRouteModule;
