package com.testsigma.automator.suggestion.actions.web;

import com.testsigma.automator.suggestion.actions.SuggestionAction;
import com.testsigma.automator.suggestion.actions.SuggestionActionResult;
import org.json.JSONObject;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GetSelectOptionCountAction extends SuggestionAction {
  @Override
  protected void execute() throws Exception {
    Select select = new Select(getDriver().findElement(getBy()));
    List<WebElement> elements = select.getOptions();
    Assert.isTrue(elements.size() != 0, String.valueOf(SuggestionActionResult.Failure));
    Map<String, String> suggestions = new HashMap<String, String>();
    suggestions.put("Options Count", new Integer(elements.size()).toString());
    List<Map<String, String>> list = new ArrayList<Map<String, String>>();
    list.add(suggestions);
    engineResult.getMetaData().setSuggestions(new JSONObject().put("list", list));
  }
}
