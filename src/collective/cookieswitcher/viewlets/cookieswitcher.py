# -*- coding: utf-8 -*-

from plone.app.layout.viewlets import ViewletBase
from plone import api

class CookieSwitcherViewlet(ViewletBase):

    def matomo_url(self):
        url = api.portal.get_registry_record(name='collective.cookieswitcher.matomo_url', default='')
        return "var matomoUrl = '{0}'".format(url)

    def render(self):
        return super(CookieSwitcherViewlet, self).render()
