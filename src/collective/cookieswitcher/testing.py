# -*- coding: utf-8 -*-
from plone.app.contenttypes.testing import PLONE_APP_CONTENTTYPES_FIXTURE
from plone.app.robotframework.testing import REMOTE_LIBRARY_BUNDLE_FIXTURE
from plone.app.testing import (
    applyProfile,
    FunctionalTesting,
    IntegrationTesting,
    PloneSandboxLayer,
)
from plone.testing import z2

import collective.cookieswitcher


class CollectiveCookieswitcherLayer(PloneSandboxLayer):

    defaultBases = (PLONE_APP_CONTENTTYPES_FIXTURE,)

    def setUpZope(self, app, configurationContext):
        # Load any other ZCML that is required for your tests.
        # The z3c.autoinclude feature is disabled in the Plone fixture base
        # layer.
        import plone.restapi
        self.loadZCML(package=plone.restapi)
        self.loadZCML(package=collective.cookieswitcher)

    def setUpPloneSite(self, portal):
        applyProfile(portal, 'collective.cookieswitcher:default')


COLLECTIVE_COOKIESWITCHER_FIXTURE = CollectiveCookieswitcherLayer()


COLLECTIVE_COOKIESWITCHER_INTEGRATION_TESTING = IntegrationTesting(
    bases=(COLLECTIVE_COOKIESWITCHER_FIXTURE,),
    name='CollectiveCookieswitcherLayer:IntegrationTesting',
)


COLLECTIVE_COOKIESWITCHER_FUNCTIONAL_TESTING = FunctionalTesting(
    bases=(COLLECTIVE_COOKIESWITCHER_FIXTURE,),
    name='CollectiveCookieswitcherLayer:FunctionalTesting',
)


COLLECTIVE_COOKIESWITCHER_ACCEPTANCE_TESTING = FunctionalTesting(
    bases=(
        COLLECTIVE_COOKIESWITCHER_FIXTURE,
        REMOTE_LIBRARY_BUNDLE_FIXTURE,
        z2.ZSERVER_FIXTURE,
    ),
    name='CollectiveCookieswitcherLayer:AcceptanceTesting',
)
