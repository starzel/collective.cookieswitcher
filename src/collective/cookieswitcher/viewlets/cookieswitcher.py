# -*- coding: utf-8 -*-

from AccessControl.unauthorized import Unauthorized
from plone.app.layout.viewlets import ViewletBase

try:
    # Plone 4
    from plone.multilingual.interfaces import ITranslationManager
except ImportError:
    # Plone 5
    from plone.app.multilingual.interfaces import ITranslationManager
from plone import api

def get_link(path):
    """
    Translates given path in correct lang link
    """
    if '@@multilingual-universal-link' in path:
        return path
    try:
        canonical_target = api.content.get(path=path)
    except Unauthorized:
        return
    if not canonical_target:
        return
    tm = ITranslationManager(canonical_target, None)
    if not tm:
        return canonical_target.absolute_url()
    lang = api.portal.get_current_language()
    try:
        translation = tm.get_translation(lang)
    except Unauthorized:
        return
    if translation:
        if api.user.has_permission('View', obj=translation):
            return translation.absolute_url()

class CookieSwitcherViewlet(ViewletBase):

    def matomo_url(self):
        url = api.portal.get_registry_record(name='collective.cookieswitcher.matomo_url', default='')
        return "var matomoUrl = '{0}'".format(url)

    def render(self):
        return super(CookieSwitcherViewlet, self).render()

    def page_link(self):
        return get_link(path='/de/datenschutz')
